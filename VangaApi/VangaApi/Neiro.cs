using Microsoft.ML;
using Microsoft.ML.Data;
using OfficeOpenXml;
using System.ComponentModel;
using System.Reflection;
using static Microsoft.ML.ForecastingCatalog;

namespace VangaApi
{
    public class Neiro
    {
        public MLContext mlContext = new MLContext();
        public PredictionEngine<WellDayHistory, WellPredictionResult> predictionEngineDebit;
        public PredictionEngine<WellDayHistory, WellPredictionResult> predictionEngineEEConsume;
        public PredictionEngine<WellDayHistory, WellPredictionResult> predictionEngineExpenses;
        public PredictionEngine<WellDayHistory, WellPredictionResult> predictionEnginePumpOperating;

        public PredictionEngine<WellDayHistory, WellPredictionResult> CreatePredictionEngine(IDataView data, string atribut)
        {
            try
            {
                var pipeline = mlContext.Transforms.CopyColumns("Label", atribut)
                    .Append(mlContext.Transforms.Categorical.OneHotEncoding("Well"))
                    .Append(mlContext.Transforms.Concatenate("Features", new[] { "DayOfYear", "Month", "DayOfWeek", "Well" }))
                    .Append(mlContext.Transforms.NormalizeMinMax("Features", "Features"))
                    .Append(mlContext.Regression.Trainers.OnlineGradientDescent(labelColumnName: "Label", featureColumnName: "Features"));
                var model = pipeline.Fit(data);
                var predictions = model.Transform(data);
                return mlContext.Model.CreatePredictionEngine<WellDayHistory, WellPredictionResult>(model);
            }
            catch (Exception e)
            {
                Program.er.LogMessage("CreatePredictionEngine", e);
                return null;
            }
            
        }
        
        public List<WellPredictionResultForSerialize> ForecastDataForFilteredData(List<WellDayHistory> wellData, int wellId, int atributeId)
        {
            try
            {
                /*IDataView data = mlContext.Data.LoadFromEnumerable(wellData);
                if (atributeId == 1)
                {
                    predictionEngineDebit = CreatePredictionEngine(data, "Debit");
                }
                else if (atributeId == 2)
                {
                    predictionEngineEEConsume = CreatePredictionEngine(data, "EEConsume");
                }
                else if (atributeId == 3)
                {
                    predictionEngineExpenses = CreatePredictionEngine(data, "Expenses");
                }
                else
                {
                    predictionEnginePumpOperating = CreatePredictionEngine(data, "PumpOperating");
                }*/

                List<WellPredictionResultForSerialize> forecasts = [];
                for (int i = 1; i <= 365; i++)
                {
                    DateTime forecastDate = DateTime.Now.AddDays(i);
                    var futureData = new WellDayHistory
                    {
                        Well = wellId, // ID скважины*/
                        DateFact = forecastDate, // Будущая дата
                        DayOfYear = forecastDate.DayOfYear,
                        DayOfWeek = (float)forecastDate.DayOfWeek,
                        Month = forecastDate.Month,

                    };
                    WellPredictionResult prediction;
                    if (atributeId == 1)
                    {
                        prediction = predictionEngineDebit.Predict(futureData);
                    }
                    else if (atributeId == 2)
                    {
                        prediction = predictionEngineEEConsume.Predict(futureData);
                    }
                    else if (atributeId == 3)
                    {
                        prediction = predictionEngineExpenses.Predict(futureData);
                    }
                    else
                    {
                        prediction = predictionEnginePumpOperating.Predict(futureData);
                    }
                    forecasts.Add(new WellPredictionResultForSerialize
                    {
                        PredictedDebit = prediction.PredictedValue,
                        Date = futureData.DateFact
                    });
                    Console.WriteLine($"Дата {futureData.DateFact:yyyy-MM-dd}: {prediction.PredictedValue} м³/сутки");
                }
                return forecasts;
            }
            catch (Exception e)
            {
                Program.er.LogMessage("ForecastDataForFilteredData", e);
                return [];
            }

        }

        public Neiro()
        {
            string filePath = "C:\\Users\\Andrey\\source\\repos\\ConsoleApp2\\ConsoleApp2\\data.xlsx"; // Укажите путь к вашему Excel файлу
            List< WellDayHistory> wellData = ReadDataFromExcel(filePath);
            foreach (var edata in wellData)
            {
                edata.DayOfYear = edata.DateFact.DayOfYear; // Преобразуем дату в числовое значение
                edata.Month = edata.DateFact.Month;
                edata.DayOfWeek = (float)edata.DateFact.DayOfWeek;
            }
            IDataView data = mlContext.Data.LoadFromEnumerable(wellData);

            predictionEngineDebit = CreatePredictionEngine(data, "Debit");
            predictionEngineEEConsume = CreatePredictionEngine(data, "EEConsume");
            predictionEngineExpenses = CreatePredictionEngine(data, "Expenses");
            predictionEnginePumpOperating = CreatePredictionEngine(data, "PumpOperating");
        }
        public  List<WellDayHistory> ReadDataFromExcel(string filePath, int wellId)
        {
            var wellDataList = new List<WellDayHistory>();
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                var worksheet = package.Workbook.Worksheets[0]; 

                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++) // Начинаем с 2-й строки (первую обычно оставляют для заголовков)
                {
                    string[] data = worksheet.Cells[row, 1].Text.Split(',');
                    var wellData = new WellDayHistory
                    {
                        Well = int.Parse(data[0]),
                        DateFact = DateTime.Parse(data[1].Trim().Substring(1, 10)),
                        Debit = float.Parse(data[2].Replace('.', ',')),
                        EEConsume = float.Parse(data[3].Replace('.', ',')),
                        Expenses = float.Parse(data[4].Replace('.', ',')),
                        PumpOperating = float.Parse(data[5].Replace('.', ','))
                    };
                    if(wellId == wellData.Well)
                    {
                        wellDataList.Add(wellData);
                    }
                }
            }
            return wellDataList;
        }
        public List<WellDayHistory> ReadDataFromExcel(string filePath)
        {
            var wellDataList = new List<WellDayHistory>();
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            // Открываем Excel файл
            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                var worksheet = package.Workbook.Worksheets[0]; // Чтение с первого листа

                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++) // Начинаем с 2-й строки (первую обычно оставляют для заголовков)
                {
                    string[] data = worksheet.Cells[row, 1].Text.Split(',');
                    var wellData = new WellDayHistory
                    {
                        Well = int.Parse(data[0]),
                        DateFact = DateTime.Parse(data[1].Trim().Substring(1, 10)),
                        Debit = float.Parse(data[2].Replace('.', ',')),
                        EEConsume = float.Parse(data[3].Replace('.', ',')),
                        Expenses = float.Parse(data[4].Replace('.', ',')),
                        PumpOperating = float.Parse(data[5].Replace('.', ','))
                    };
                    wellDataList.Add(wellData);
                }
            }
            return wellDataList;
        }


        public List<WellPredictionResultForSerialize> ForecastData(List<WellDayHistorySup> wellData, int wellId)
        {
            List<WellDayHistory> wellDataNew = [];
            foreach (var edata in wellData)
            {
                wellDataNew.Add(new WellDayHistory
                {
                    Well = edata.Well,
                    DateFact = edata.DateFact,
                    Debit = edata.Debit,
                    EEConsume = edata.EEConsume,
                    Expenses = edata.Expenses,
                    DayOfYear = edata.DateFact.DayOfYear,
                    Month = edata.DateFact.Month,
                    DayOfWeek = (float)edata.DateFact.DayOfWeek
                });
            }
            var data = mlContext.Data.LoadFromEnumerable(wellDataNew);
            var pipeline = mlContext.Transforms.CopyColumns("Label", "Debit")
                .Append(mlContext.Transforms.Concatenate("Features", new[] {  "DayOfYear", "Month", "DayOfWeek", "EEConsume", "Expenses", "PumpOperating" }))
                .Append(mlContext.Transforms.NormalizeMinMax("Features", "Features"))
                .Append(mlContext.Regression.Trainers.OnlineGradientDescent(labelColumnName: "Label", featureColumnName: "Features"));
            var model = pipeline.Fit(data);

            // 5. Прогнозируем на тех же данных
            var predictions = model.Transform(data);

            // 6. Выводим прогнозы
            var predictionEngine = mlContext.Model.CreatePredictionEngine<WellDayHistory, WellPredictionResult>(model);

            List<WellPredictionResultForSerialize> forecasts = new List<WellPredictionResultForSerialize>();
            
            Console.WriteLine("\nПрогноз на следующие дни:");
            for (int i = 1; i <= 100; i++)
            {
                DateTime forecastDate = DateTime.Now.AddDays(i);
                var futureData = new WellDayHistory
                {
                    Well = wellId, // ID скважины
                    DateFact = forecastDate, // Будущая дата
                    DayOfYear = forecastDate.DayOfYear,
                    DayOfWeek = (float)forecastDate.DayOfWeek,
                    Month = forecastDate.Month,
                };
                var prediction = predictionEngine.Predict(futureData);
                forecasts.Add(new WellPredictionResultForSerialize
                {
                    PredictedDebit = prediction.PredictedValue,
                    Date = futureData.DateFact
                });
                Console.WriteLine($"Дата {futureData.DateFact:yyyy-MM-dd}: {prediction.PredictedValue} м³/сутки");
            }
            return forecasts;
        }
    }
}
