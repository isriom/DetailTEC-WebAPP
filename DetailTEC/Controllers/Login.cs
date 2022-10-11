using System.Security.Claims;
using System.Text.Json;
using DetailTEC.Controllers.DB;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;

[ApiController]
/*
 * Clase Controladora del componente del Login de la Pagina
 */
public class LoginController : Controller
{
    /**
     * Metodo donde se realiza la autorizacion de los usuarios cuando se presiona el boton de Sign In
     */
    [AllowAnonymous]
    [HttpPut]
    [Route("/api/Signin")]
    public async Task<ActionResult> Login(Data.LoginUser data)
    {
        var rol = await AuthenticateUser(data.Usuario, data.Contraseña);
        await Console.Out.WriteAsync(JsonSerializer.Serialize(data) + "\n");
        if (rol == "No Found")
        {
            await Console.Out.WriteAsync("No found");
            return NotFound(data);
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, data.Usuario),
            new(ClaimTypes.Role, rol)
        };
        var claimIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimIdentity), new AuthenticationProperties
            {
                IsPersistent = false,
                RedirectUri = "", AllowRefresh = false
            });

        await Console.Out.WriteAsync(JsonSerializer.Serialize(
            HttpContext.Request.Cookies));
        return Content(JsonSerializer.Serialize(
            claims[1].Value)
        );
    }

    /**
     * Metodo que realiza la autenticacion del usuario
     */
    private static Task<string> AuthenticateUser(string id, string password)
    {
        return Task.FromResult(id switch
        {
            "admin" when password == "admin" => "Trabajador",
            "user" when password == "user" => "Cliente",
            _ => "Trabajador"
        });

        // //Implementar codigo para revisar base de datos aquí

        // var role = DBController.FoundUser(id, password);
        // return role;
    }

    /**
     * Metodo que determina la accion al presionar el boton de Log Out
     */
    [AllowAnonymous]
    [HttpPut]
    [Route("/logout")]
    public async Task<ActionResult> Logout(Data.LoginUser? data)
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        if (HttpContext.Request.Cookies.ContainsKey(".AspNetCore.Cookies"))
            HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");

        await Console.Out.WriteAsync("Log out");
        return Content(JsonSerializer.Serialize(
            new Data.LoginUser()));
    }
}