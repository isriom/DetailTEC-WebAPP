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
 * Clase Controladora del componente de los Trabajadores desde la vista del Trabajador
 */
public class TrabajadoresController : Controller
{
    //Variable de estrutura

    private Data.GTrabajadores ejemplo;


    /**
     * Metodo que define una accion resultante que define y comprueba la estructura que se debe ingresar siendo una platilla
     */
    [HttpGet]
    [Route("api/[controller]")]
    public ActionResult trabajadores()
    {
        ejemplo = new Data.GTrabajadores();
        ejemplo.Nombre = "Arnoldo";
        ejemplo.Apellidos = "Perez Mora";
        ejemplo.Numero_Cedula = 258741028;
        ejemplo.Fecha_Ingreso = "25/08/2014";
        ejemplo.Fecha_Nacimiento = "7/3/1987";
        ejemplo.Edad = 35;
        ejemplo.Password = "hdbsajnojds";
        ejemplo.Rol = "Mecanico";


        var jsonstring = JsonSerializer.Serialize(ejemplo);

        return Content(jsonstring);
    }

    /**
     * Metodo donde se define la logica de la accion que realiza el boton de Add para poder registrar el trabajador
     */
    [HttpPost]
    [Route("api/[controller]/post")]
    public ActionResult Insert(Data.GTrabajadores trabajador)
    {
        Console.Out.Write("Prueba");
        DBController.RegistrarTT(trabajador);
        Console.Out.Write(trabajador);
        var jsonstring = JsonSerializer.Serialize(ejemplo);
        Console.Out.Write("jsonstring:\n");
        Console.Out.Write(jsonstring);
        return CreatedAtAction(nameof(Insert), new Data.GTrabajadores());
    }

    /**
     * Metodo donde se define la logica de la accion que realiza el boton de Add para poder registrar el trabajador
     */
    [HttpDelete]
    [Route("api/[controller]/delete")]
    public ActionResult Delete(int id)
    {
        Console.Out.Write("Eliminar Trabajador");

        //Codigo de eliminar trabajador aqui

        var jsonstring = JsonSerializer.Serialize("Trabajador ced " + id + " eliminado");
        return Accepted(id);
    }
}