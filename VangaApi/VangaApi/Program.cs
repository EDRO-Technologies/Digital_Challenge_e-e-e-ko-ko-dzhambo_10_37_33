
using Microsoft.AspNetCore.Hosting;
using Microsoft.ML;
using VangaApi;

class Program
{
    public static Neiro nr;
    public static ErrorLogger er = new ErrorLogger();

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
                string databaseUrl = "https://juwmddbklxkinbhndkqh.supabase.co";
                string databaseToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1d21kZGJrbHhraW5iaG5ka3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3ODAzNjcsImV4cCI6MjA0NzM1NjM2N30.8xJNnLxJ8p3YfFRmDlaOBvHQ14I0_pt1cI-IiBlQTU0";
                return new Supabase.Client(databaseUrl, databaseToken);
            });
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.Use(async (context, next) =>
            {
                context.Response.Headers.Remove("Access-Control-Allow-Origin");
                context.Response.Headers.Remove("Access-Control-Allow-Methods");
                context.Response.Headers.Remove("Access-Control-Allow-Headers");
                await next();
            });
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

