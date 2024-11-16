
using Microsoft.AspNetCore.Hosting;
using Microsoft.ML;
using VangaApi;

class Program
{
    public static Neiro nr;
    public static void Main()
    {
        nr = new Neiro();
        CreateHostBuilder().Build().Run();

        var builder = WebApplication.CreateBuilder();


        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        var app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
    public static IHostBuilder CreateHostBuilder() =>
        Host.CreateDefaultBuilder()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<Supabase.Client>(provider =>
            {
                string databaseUrl = "https://zlqknyuatcoldsmfnrpd.supabase.co";
                string databaseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscWtueXVhdGNvbGRzbWZucnBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTc0Mzg5MiwiZXhwIjoyMDQ3MzE5ODkyfQ.G9O6DiCHokqCIRgfRaejDtUw7llbIvPwcspv-OY8L9Q";
                return new Supabase.Client(databaseUrl, databaseToken);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

