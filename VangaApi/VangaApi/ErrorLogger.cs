using System.Runtime.CompilerServices;
namespace VangaApi
{
    public class ErrorLogger
    {
        private char sep = Path.AltDirectorySeparatorChar;
        private string? fileName;
        private string? curDirecrtory;
        private string? path;

        public ErrorLogger()
        {
            curDirecrtory = Directory.GetCurrentDirectory();
            Directory.CreateDirectory(curDirecrtory + sep + "ErrorLogs");
            curDirecrtory += sep + "ErrorLogs";
        }

        public void LogMessage(string data,
            Exception exception,
            [CallerLineNumber] int lineNumber = 0)
        {
            try
            {
                string message = $"~~{DateTime.Now} line:{lineNumber} was exeption: {data}\n{exception.Message}\n";
                fileName = sep + DateTime.Now.ToString("dd.MM.yyyy") + ".txt";
                path = curDirecrtory + fileName;
                using StreamWriter logWriter = new StreamWriter(path, true);
                logWriter.WriteLine(message);
                logWriter.Flush();
            }
            catch { }

        }
        public void LogMessage(string data,
            [CallerLineNumber] int lineNumber = 0)
        {
            try
            {
                string message = $"~~{DateTime.Now} line:{lineNumber} was exeption: {data}\n";
                fileName = sep + DateTime.Now.ToString("dd.MM.yyyy") + ".txt";
                path = curDirecrtory + fileName;
                using StreamWriter logWriter = new StreamWriter(path, true);
                logWriter.WriteLine(message);

                logWriter.Flush();
            }
            catch { }

        }



    }

}