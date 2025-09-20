using AutoMapper;
using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Base
{
    public interface IRuService<GetDTO, UpdateDTO, T>
    {
        public Task<GetDTO> GetByIdAsync(int id);
        public Task<IEnumerable<GetDTO>> GetAllAsync();
        public Task UpdateAsync(UpdateDTO dto);
    }

    public class RuService<GetDTO, UpdateDTO, T>(IUnitOfWork _unitOfWork, IMapper _mapper, string[]? _includes = null, IImageUploadService? _imageUploadService = null) : IRuService<GetDTO, UpdateDTO, T>
        where GetDTO : BaseDTO
        where UpdateDTO : BaseDTO
        where T : BaseEntity
    {
        public async Task<GetDTO> GetByIdAsync(int id)
        {
            var entity = await _unitOfWork.Repository<T>().GetByIdAsync(id, _includes);
            return _mapper.Map<GetDTO>(entity);
        }

        public async Task<IEnumerable<GetDTO>> GetAllAsync()
        {
            var entities = await _unitOfWork.Repository<T>().GetAllAsync(_includes);
            return _mapper.Map<IEnumerable<GetDTO>>(entities);
        }

        public async Task UpdateAsync(UpdateDTO dto)
        {
            var entity = _mapper.Map<T>(dto);

            // Check if entity is ImageEntity and handle image upload automatically
            if (entity is ImageEntity imageEntity && _imageUploadService != null)
            {
                var dtoType = typeof(UpdateDTO);
                var imageFileProp = dtoType.GetProperty("ImageFile");
                var imageFile = imageFileProp?.GetValue(dto) as IFormFile;

                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadResult = await _imageUploadService.UploadImageAsync(imageFile, "chaolong-bucket");
                    imageEntity.ImageUrl = uploadResult.PublicUrl;
                }
            }

            _unitOfWork.Repository<T>().Update(entity);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}