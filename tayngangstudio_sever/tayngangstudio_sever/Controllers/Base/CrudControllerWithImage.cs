using BusinessLogicLayer.DTO.Abstract;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudControllerWithImage<CreateDTO, GetDTO, UpdateDTO, T>(ICrudService<CreateDTO, GetDTO, UpdateDTO, T> _crudService) : ControllerBase
        where CreateDTO : class
        where GetDTO : BaseGetDTO
        where UpdateDTO : class
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

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            var entity = await _crudService.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound("Entity not found.");
            }

            return Ok(new { Message = "Get record by ID successfully", Data = entity });
        }

        [HttpPost]
        public virtual async Task<IActionResult> CreateWithImageAsync([FromForm] CreateDTO dto)
        {
            await _crudService.CreateAsync(dto);
            return Ok(new { Message = "Create new record with image successfully", Data = dto });
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> UpdateWithImageAsync([FromForm] UpdateDTO dto)
        {
            if (dto == null)
            {
                return BadRequest("Entity is null or ID mismatch.");
            }
            await _crudService.UpdateAsync(dto);
            return Ok(new { Message = "Update record with image successfully", Data = dto });
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