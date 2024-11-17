using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Reflection;
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
        [Obsolete]
        //[Obsolete]
        public async Task<IActionResult> GetWellDayHistories([FromBody] WellRequest request)
        {
            try
            {

                string filePath = Directory.GetCurrentDirectory() + Path.DirectorySeparatorChar + "data.xlsx"; // Укажите путь к вашему Excel файлу

                var list = Program.nr.ReadDataFromExcel(filePath, request.WellId);
                if (list == null || list.Count == 0) 
                {
                    return BadRequest(500);
                }

                var resplist = Program.nr.ForecastDataForFilteredData(list, request.WellId, request.AtributeId);

                return Ok(resplist);

            }
            catch (Exception e)
            {
                Program.er.LogMessage("GetWellDayHistoriesApi", e);
                return BadRequest();
            }

        }
    }

    public class WellRequest
    {
        public int WellId { get; set; }
        public int AtributeId { get; set; }

    }

    

}
