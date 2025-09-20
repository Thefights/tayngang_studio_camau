using AutoMapper;
using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Base
{
    public interface ICrudService<CreateDTO, GetDTO, UpdateDTO, T>
    {
        public Task<GetDTO> GetByIdAsync(int id);
        public Task<IEnumerable<GetDTO>> GetAllAsync();
        public Task<CreateDTO> CreateAsync(CreateDTO dto);
        public Task UpdateAsync(UpdateDTO dto);
        public Task DeleteAsync(int id);
    }

    public class CrudService<CreateDTO, GetDTO, UpdateDTO, T>(IUnitOfWork _unitOfWork, IMapper _mapper, IImageUploadService? _imageUploadService = null, string[]? _includes = null) : ICrudService<CreateDTO, GetDTO, UpdateDTO, T>
        where CreateDTO : BaseDTO
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

        public async Task<CreateDTO> CreateAsync(CreateDTO dto)
        {
            var entity = _mapper.Map<T>(dto);

            // Check if entity is ImageEntity and handle image upload automatically
            if (entity is ImageEntity imageEntity && _imageUploadService != null)
            {
                var dtoType = typeof(CreateDTO);
                var imageFileProp = dtoType.GetProperty("ImageFile");
                var imageFile = imageFileProp?.GetValue(dto) as IFormFile;

                if (imageFile != null && imageFile.Length > 0)
                {
                    var uploadResult = await _imageUploadService.UploadImageAsync(imageFile, "chaolong-bucket");
                    imageEntity.ImageUrl = uploadResult.PublicUrl;
                }
            }

            await _unitOfWork.Repository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<CreateDTO>(entity);
        }

        public async Task<CreateDTO> CreateWithImageAsync(CreateDTO dto)
        {
            var entity = _mapper.Map<T>(dto);

            var dtoType = typeof(CreateDTO);
            var imageFileProp = dtoType.GetProperty("ImageFile");

            var imageFile = imageFileProp?.GetValue(dto) as IFormFile;

            if (imageFile != null && imageFile.Length > 0 && _imageUploadService != null)
            {
                var uploadResult = await _imageUploadService.UploadImageAsync(imageFile, "chaolong-bucket");

                var imageProperty = typeof(T).GetProperty("ImageUrl");
                if (imageProperty != null && imageProperty.PropertyType == typeof(string))
                {
                    imageProperty.SetValue(entity, uploadResult.PublicUrl);
                }
            }

            await _unitOfWork.Repository<T>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<CreateDTO>(entity);
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

        public async Task DeleteAsync(int id)
        {
            var entity = await _unitOfWork.Repository<T>().GetByIdAsync(id, _includes);

            if (entity == null)
            {
                throw new KeyNotFoundException($"Entity with ID {id} not found.");
            }

            _unitOfWork.Repository<T>().Delete(entity);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}