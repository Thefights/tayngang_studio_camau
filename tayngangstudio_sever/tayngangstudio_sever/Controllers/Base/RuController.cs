using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.AbstractEntities;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class RuController<GetDTO, UpdateDTO, T>(IRuService<GetDTO, UpdateDTO, T> _ruService) : ControllerBase
        where GetDTO : BaseDTO
        where UpdateDTO : BaseUpdateDTO
        where T : BaseEntity
    {
        [HttpGet]
        public virtual async Task<IActionResult> GetAllAsync()
        {
            var entities = await _ruService.GetAllAsync();

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

            await _ruService.UpdateAsync(dto);
            return Ok(new { Message = "Update record successfully", Data = dto });
        }
    }
}