using Microsoft.ML;

namespace VangaApi
{
    public class Neiro
    {
        public MLContext mlContext = new MLContext();
        public Neiro()
        {
            
        }
        public List<WellPredictionResultForSerialize> ForecastData(List<WellDayHistory> wellData)
        {
            foreach (var edata in wellData)
            {
                edata.DayOfYear = edata.DateFact.DayOfYear; // Преобразуем дату в числовое значение
            }
            // 2. Преобразуем данные в IDataView для ML.NET
            var data = mlContext.Data.LoadFromEnumerable(wellData);
            var avgEEConsume = wellData.Average(d => d.EEConsume);
            var avgExpenses = wellData.Average(d => d.Expenses);
            var avgPumpOperating = wellData.Average(d => d.PumpOperating);

            // 3. Подготовим данные: преобразуем дату в числовой формат (например, день недели, месяц)
            var pipeline = mlContext.Transforms.CopyColumns("Label", "Debit")
                .Append(mlContext.Transforms.Concatenate("Features", new[] { "DayOfYear", "Month", "DayOfWeek", "EEConsume", "Expenses", "PumpOperating" }))
                .Append(mlContext.Transforms.NormalizeMinMax("Features", "Features"))
                .Append(mlContext.Regression.Trainers.OnlineGradientDescent(labelColumnName: "Label", featureColumnName: "Features"));
            var model = pipeline.Fit(data);

            // 5. Прогнозируем на тех же данных
            var predictions = model.Transform(data);

            // 6. Выводим прогнозы
            var predictionEngine = mlContext.Model.CreatePredictionEngine<WellDayHistory, WellPredictionResult>(model);

            var futureData = new WellDayHistory
            {
                Well = 1111, // ID скважины
                DateFact = new DateTime(2025, 01, 01), // Будущая дата
                DayOfYear = new DateTime(2025, 01, 01).DayOfYear,
                EEConsume = avgEEConsume, // Используем среднее значение
                Expenses = avgExpenses,   // Используем среднее значение
                PumpOperating = avgPumpOperating // Примерное значение работы насоса
            };

            List<WellPredictionResultForSerialize> forecasts = new List<WellPredictionResultForSerialize>();
            var prediction = predictionEngine.Predict(futureData);
            forecasts.Add(new WellPredictionResultForSerialize
            {
                PredictedDebit = prediction.PredictedDebit,
                Date = futureData.DateFact
            });
            Console.WriteLine("\nПрогноз на следующие дни:");
            for (int i = 1; i <= 100; i++)
            {
                var nextDate = futureData.DateFact.AddDays(1);
                futureData.DateFact = nextDate;
                futureData.DayOfYear = nextDate.DayOfYear;
                futureData.Month = nextDate.Month;
                futureData.DayOfWeek = (float)nextDate.DayOfWeek;
                prediction = predictionEngine.Predict(futureData);
                forecasts.Add(new WellPredictionResultForSerialize
                {
                    PredictedDebit = prediction.PredictedDebit,
                    Date = futureData.DateFact
                });
                Console.WriteLine($"Дата {futureData.DateFact:yyyy-MM-dd}: {prediction.PredictedDebit} м³/сутки");
                
            }
            return forecasts;
        }
    }
}
