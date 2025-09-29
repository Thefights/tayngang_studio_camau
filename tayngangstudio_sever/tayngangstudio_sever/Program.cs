using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Middlewares;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using tayngangstudio_sever.Extenstions;

var builder = WebApplication.CreateBuilder(args);
var QuachKhangOrigin = "QuachKhangPolicy";

var configuration = builder.Configuration.Get<AppConfiguration>()!;
builder.Services.AddSingleton(configuration);

builder.Services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
         options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
     });

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(configuration.ConnectionStrings.TayNgangDb);
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TayNgang API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
});
});

builder.Services.AddScopeService();
builder.Services.AddAWSService(configuration);
builder.Services.AddPaymentService(configuration);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: QuachKhangOrigin,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000", "https://sotaycamau.vercel.app/")
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials();
                      });
});


var app = builder.Build();

app.UseMiddleware<JwtMiddleware>();
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors(QuachKhangOrigin);

app.UseHttpsRedirection();


app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TayNgang API v1");
    c.RoutePrefix = "swagger";

});


app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
