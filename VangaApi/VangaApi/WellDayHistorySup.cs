using System.Text.Json.Serialization;
using Microsoft.ML.Data;
using Supabase.Postgrest.Attributes;

namespace VangaApi
{

    [Table("well_day_histories")]
    [Obsolete]
    public class WellDayHistorySup : Supabase.SupabaseModel
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
    public class WellDayHistory
    {
        public int Well { get; set; }
        public DateTime DateFact { get; set; }
        public float Debit { get; set; }
        public float EEConsume { get; set; }
        public float Expenses { get; set; }
        public float PumpOperating { get; set; }
        public float DayOfYear;
        public float Month;
        public float DayOfWeek;
    }
    public class WellPredictionResult
    {
        [ColumnName("Score")]
        public float PredictedValue { get; set; }

    }
    public class WellPredictionResultForSerialize
    {
        public float PredictedDebit { get; set; }
        public DateTime Date { get; set; }

    }

}
