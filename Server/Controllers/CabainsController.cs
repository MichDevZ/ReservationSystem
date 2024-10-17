
using ReadData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Controllers 
{
 [ApiController]
 [Route("api/[controller]")]
public class CabainsController : ControllerBase
{

    private readonly AppReservasContext _context;

    public CabainsController(AppReservasContext context)
    {
        _context = context;
    }

    [HttpGet]
        public async Task<ActionResult<IEnumerable<Cabain>>> GetCabins()
        {
             var cabains = await _context.Cabain.ToListAsync();
            return Ok(cabains); // Asegúrate de devolver el resultado correctamente
        }

}

}
