using System.Text.Json.Serialization;
using Microsoft.ML.Data;
using Supabase.Postgrest.Attributes;

namespace VangaApi
{
    [Table("well_day_histories")]
    [Obsolete]
    public class WellDayHistory: Supabase.SupabaseModel
    {
        [PrimaryKey("well_id")]
        public int Well { get; set; }
        [JsonPropertyName("date_fact")]
        [Column("date_fact")]
        public DateTime DateFact { get; set; }
        [JsonPropertyName("debit")]
        [Column("debit")]
        public float Debit { get; set; }
        [JsonPropertyName("ee_consume")]
        [Column("ee_consume")]
        public float EEConsume { get; set; }
        [JsonPropertyName("expenses")]
        [Column("expenses")]
        public float Expenses { get; set; }
        [JsonPropertyName("pump_operating")]
        [Column("pump_operating")]
        public float PumpOperating { get; set; }
        
        public float DayOfYear;
        public float Month;
        public float DayOfWeek;
    }
    public class WellDayHistoryDTO
    {
        public int WellId { get; set; }
        public DateTime Date { get; set; }
        public int DayNumber { get; set; }
        public double Value1 { get; set; }
        public double Value2 { get; set; }
        public int Value3 { get; set; }
    }
    public class WellPredictionResult
    {
        [ColumnName("Score")]
        public float PredictedDebit { get; set; }

    }
    public class WellPredictionResultForSerialize
    {
        public float PredictedDebit { get; set; }
        public DateTime Date { get; set; }

    }

}
