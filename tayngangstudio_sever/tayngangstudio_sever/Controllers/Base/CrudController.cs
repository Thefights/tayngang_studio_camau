using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.DTO.Abstract.ImageDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Base
{
    [ApiController]
    public abstract class CrudController<CreateDTO, UpdateDTO, GetDTO, T>(ICrudService<CreateDTO, GetDTO, UpdateDTO, T> _crudService) : ControllerBase
        where CreateDTO : BaseDTO
        where GetDTO : BaseDTO
        where UpdateDTO : BaseDTO
        where T : BaseEntity
    {
        [HttpGet]
        public virtual async Task<IActionResult> GetAllAsync()
        {
            var entities = await _crudService.GetAllAsync();

            if (entities == null || !entities.Any())
            {
                return NotFound("No entities found.");
            }

            return Ok(new { Message = "Get all records successfully", Data = entities });
        }

        [HttpPost("create")]
        public virtual async Task<IActionResult> CreateAsync([FromForm] CreateDTO dto)
        {
            if (dto is CreateImageDTO imageDTO)
            {
                await _crudService.CreateWithImageAsync(dto);
            }
            else
            {
                await _crudService.CreateAsync(dto);

            }

            return Ok(new { Message = "Create new record successfully", Data = dto });
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> UpdateAsync([FromForm] UpdateDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Entity is null or ID mismatch.");
            }

            if (dto is UpdateImageDTO imageDTO)
            {
                await _crudService.UpdateWithImageAsync(dto);
            }
            else
            {
                await _crudService.UpdateAsync(dto);
            }

            return Ok(new { Message = "Update record successfully", Data = dto });
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteAsync(int id)
        {
            var existingEntity = await _crudService.GetByIdAsync(id);

            if (existingEntity == null)
            {
                return NotFound("Entity not found.");
            }

            await _crudService.DeleteAsync(id);
            return Ok("Delete record successfully");
        }
    }
}