using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using PruebaDetail.Models;

//Load Database from FILE

var builder = WebApplication.CreateBuilder(args);
// Add cookie Authenticationas a default politic
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "";
        options.AccessDeniedPath = "";
    });
//Add cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            //Allow exchange betwen proxy, real server and web browser
            policy.WithOrigins("https://localhost:7143", "https://localhost:44421", "https://localhost:44366",
                "https://localhost:33863").AllowCredentials();
            policy.WithExposedHeaders("*");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});


builder.Services.AddHttpContextAccessor();

builder.Services.AddDbContext<PruebaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("conexion")));

// Add services to the container.

builder.Services.AddControllers();
//Start app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseHttpsRedirection();
// Use angular webs sites 
app.UseStaticFiles();
app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
app.UseCookiePolicy(new CookiePolicyOptions());

app.MapControllerRoute(
    "default",
    "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
;

app.Run();