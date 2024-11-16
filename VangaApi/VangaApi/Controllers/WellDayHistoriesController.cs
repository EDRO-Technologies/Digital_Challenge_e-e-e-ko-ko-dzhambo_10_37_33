using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace VangaApi.Controllers
{
    [ApiController]
    [Route("/")]
    public class WellDayHistoriesController : ControllerBase
    {
        private readonly Supabase.Client _supabase;

        public WellDayHistoriesController(Supabase.Client supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        //[Obsolete]
        public async Task<IActionResult> GetWellDayHistories([FromBody] WellRequest request)
        {
            var response = await _supabase.From<WellDayHistorySup>().Where(w => w.Well == request.WellId).Get();
            //var list = Program.nr.ForecastData(response.Models, request.WellId);

            
            //var list = Program.nr.ForecastDataForAllData(request.WellId, request.AtributeId);
            var list = Program.nr.ForecastDataForFilteredData(response.Models, request.WellId, request.AtributeId);

            



            return Ok(list);
        }
    }
    public class WellRequest
    {
        public int WellId { get; set; }
        public int AtributeId { get; set; }

    }
}
