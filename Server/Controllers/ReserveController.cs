
using ReadData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Controllers 
{
 [ApiController]
 [Route("api/[controller]")]
public class ReserveController : ControllerBase
{

    private readonly AppReservasContext _context;

    public ReserveController(AppReservasContext context)
    {
        _context = context;
    }

    [HttpGet]
        public async Task<ActionResult<IEnumerable<Reserves>>> GetReserves()
        {
             var reserves = await _context.Reserves.ToListAsync();
            return Ok(reserves); 
        }
        
    [HttpPost]
        public async Task<ActionResult<IEnumerable<Reserves>>> PostReserve(Reserves reserve)
        {
             
            _context.Reserves.Add(reserve);
            
            await _context.SaveChangesAsync();
            
            var reserves = await _context.Reserves.ToListAsync();
            return Ok(reserves);
        }

          [HttpGet("id")]
        public async Task<ActionResult<IEnumerable<Reserves>>> GetReserve([FromQuery] int id)
        {
             
             var reserves = await _context.Reserves.Where(r => r.CabainId == id).ToListAsync();

                if (reserves == null)
                {
                    return NotFound(); 
                }

                return Ok(reserves);
        }        


}

}
