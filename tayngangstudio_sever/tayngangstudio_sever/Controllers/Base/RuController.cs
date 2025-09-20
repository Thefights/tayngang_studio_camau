using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.DTO.Abstract.ImageDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuController<GetDTO, UpdateDTO, T>(IRuService<GetDTO, UpdateDTO, T> _crudService) : ControllerBase
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

        [HttpPut]
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
    }
}