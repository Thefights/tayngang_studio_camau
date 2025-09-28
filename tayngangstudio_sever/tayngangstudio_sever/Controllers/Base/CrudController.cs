using BusinessLogicLayer.DTO.Abstract;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Base
{
    [ApiController]
    public abstract class CrudController<CreateDTO, GetDTO, UpdateDTO, T>(ICrudService<CreateDTO, GetDTO, UpdateDTO, T> _crudService) : ControllerBase
        where CreateDTO : class
        where GetDTO : BaseGetDTO
        where UpdateDTO : class
        where T : BaseEntity
    {

        [HttpGet]
        public virtual async Task<IActionResult> GetAllAsync()
        {
            // Lấy tên controller, ví dụ "Cart" từ "CartController"
            var entityName = ControllerContext.ActionDescriptor.ControllerName;

            var entities = await _crudService.GetAllAsync();

            if (entities == null || !entities.Any())
            {
                return NotFound($"{entityName} not found.");
            }

            return Ok(new { Message = $"Get {entityName} successfully", Data = entities });
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(int id)
        {
            var entityName = ControllerContext.ActionDescriptor.ControllerName;

            var entity = await _crudService.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound($"{entityName} not found.");
            }

            return Ok(new { Message = $"Get {entityName} by ID successfully", Data = entity });
        }

        [HttpPost]
        public virtual async Task<IActionResult> CreateAsync([FromBody] CreateDTO dto)
        {
            var entityName = ControllerContext.ActionDescriptor.ControllerName;

            var result = await _crudService.CreateAsync(dto);
            return Ok(new { Message = $"Create new {entityName} successfully", Data = result });
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] UpdateDTO dto)
        {
            var entityName = ControllerContext.ActionDescriptor.ControllerName;

            if (dto == null)
            {
                return BadRequest($"{entityName} is null or ID mismatch.");
            }

            await _crudService.UpdateAsync(id, dto);
            return Ok(new { Message = $"Update {entityName} successfully", Data = dto });
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteAsync(int id)
        {
            var entityName = ControllerContext.ActionDescriptor.ControllerName;

            var existingEntity = await _crudService.GetByIdAsync(id);

            if (existingEntity == null)
            {
                return NotFound($"{entityName} not found.");
            }

            await _crudService.DeleteAsync(id);
            return Ok($"Delete {entityName} successfully");
        }
    }
}