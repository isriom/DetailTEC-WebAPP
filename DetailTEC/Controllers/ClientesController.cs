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
[Authorize(Roles = "Trabajador")]

/*
 * Clase Controladora del componente de los Clientes para el trabajador
 */
public class ClientesController : Controller
{
    /*
     * Definicion de la variable 
     */
    private Data.G_clientes ejemplo;


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
        ejemplo = new Data.G_clientes();
        // User.IsInRole("Administrators");
        ejemplo.Nombre_Completo = "Armando";
        ejemplo.Correo_electronico = "vcevvbceo@bbgx.com";
        ejemplo.Cedula = 321547841;
        ejemplo.Direccion_1 = "chbljdblkxnl";
        ejemplo.Direccion_2 = "xasbkjc vjbd";
        ejemplo.Telefono_1 = 87452145;
        ejemplo.Telefono_2 = 25548782;
        ejemplo.Usuario = "armadillo";


        var jsonstring = JsonSerializer.Serialize(ejemplo);

        return Content(jsonstring);
    }

    /**
     * Metodo donde se define la logica de la accion que realiza el boton de Add para poder registrar el cliente
     */
    [HttpPost]
    [Route("[controller]/post")]
    public ActionResult Insert(Data.G_clientes cliente)
    {
        DBController.RegistrarTC(cliente);
        Console.Out.Write("Cliente Registrado");
        var jsonstring = JsonSerializer.Serialize(cliente);
        Console.Out.Write(jsonstring + "\n");
        return CreatedAtAction(nameof(Insert), new Data.G_clientes());
    }
}