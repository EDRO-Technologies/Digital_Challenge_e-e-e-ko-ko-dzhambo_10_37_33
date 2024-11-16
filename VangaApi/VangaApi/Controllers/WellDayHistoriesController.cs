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
            var response = await _supabase.From<WellDayHistory>().Where(w => w.Well == request.WellId).Get();
            //var modeles = response.Models.ToArray();
            var data = response.Models.Select(record => new WellDayHistoryDTO
            {
                WellId = (int)record.Well,
            }).ToList();

            return Ok(data);
        }
    }
    public class WellRequest
    {
        //[JsonPropertyName("WellId")]
        public int WellId { get; set; }
    }
}
