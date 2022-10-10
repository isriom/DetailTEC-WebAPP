using System.Text.Json;
using DetailTEC.Controllers.DB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers;

/**
 * Permisos del api para el tema de autorizaciones
 */
[ApiController]
[Authorize]
[Authorize(Roles = "Cliente")]
/*
 * Clase Controladora del componente de los Clientes desde la parte del Cliente
 */
public class GClientesController : Controller
{
    //Variarible de estructura
    private Data.G_ClientesVC ejemplo;


    /**
     * Metodo que define una accion resultante
     */
    [HttpGet]
    [Route("[controller]/{data}")]
    public ActionResult Register(string? data)
    {
        var jsonstring = JsonSerializer.Serialize(ejemplo);
        return Content(jsonstring);
    }

    /**
     * Metodo que define una accion resultante
     */
    [HttpGet]
    [Route("[controller]/{id:int}")]
    public ActionResult Consult(int? id)
    {
        var jsonstring = JsonSerializer.Serialize(ejemplo);
        return Content(jsonstring);
    }


    /**
     * Metodo que define una accion resultante que define y comprueba la estructura que se debe ingresar siendo una platilla
     */
    [HttpGet]
    [Route("[controller]/plantilla")]
    public ActionResult template()
    {
        ejemplo = DBController.GetdUser(User.Identity.Name);


        var jsonstring = JsonSerializer.Serialize(ejemplo);

        return Content(jsonstring);
    }

    /**
     * Metodo donde se define la logica de la accion que realiza el boton de Add para poder registrar el cliente
     */
    [HttpPost]
    [Route("[controller]/post")]
    public ActionResult Insert(Data.G_ClientesVC cliente)
    {
        ejemplo = DBController.GetdUser(User.Identity.Name);

        if (User.Identity.Name != cliente.Usuario || ejemplo.Cedula != cliente.Cedula) return Unauthorized();

        Console.Out.Write("Cliente Registrado");
        DBController.RegistrarCC(cliente);
        return CreatedAtAction(nameof(Insert), ejemplo);
    }
}