using System.Text.Json;
using DetailTEC.Controllers.DB;
using DetailTEC.Controllers.DB.Facturas;
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
 * Clase Controladora del componente de las Citas para el trabajador
 */
public class CitasController : Controller
{
    /*
     * Definicion de la variable 
     */
    private Data.Cita prueba;

    
    /**
     * Metodo que define una accion resultante
     */
    [HttpGet]
    [Route("[controller]/{data}")]
    public ActionResult Register(string? data)
    {
        var jsonstring = JsonSerializer.Serialize(prueba);
        return Content(jsonstring);
    }

    /**
     * Metodo que define una accion resultante
     */
    [HttpGet]
    [Route("[controller]/{id:int}")]
    public ActionResult Consult(int? id)
    {
        var jsonstring = JsonSerializer.Serialize(prueba);
        return Content(jsonstring);
    }

    /**
     * Metodo que define una accion resultante que define y comprueba la estructura que se debe ingresar siendo una platilla
     */
    [HttpGet]
    [Route("[controller]/plantilla")]
    public ActionResult template()
    {
        prueba = new Data.Cita();
        User.IsInRole("Administrators");
        prueba.Cliente = "Cliente de prueba";
        prueba.Placa_del_Vehiculo = 1115486;
        prueba.Sucursal = "Sucursal de prueba";
        prueba.Servicio_solicitado = "Servicio de prueba";


        var jsonstring = JsonSerializer.Serialize(prueba);

        return Content(jsonstring);
    }

    /**
     * Metodo donde se define la logica de la accion que realiza el boton de Add para poder crear el PDF y registrar la cita
     */
    [HttpPost]
    [Route("[controller]/post")]
    public ActionResult Insert(Data.Cita cita)
    {
        Console.Out.Write("Creando el pdf");
        var numeroF = PdfHandler.FacturaCita(cita);
        DBController.RegistrarCitayFactura(cita, Convert.ToDouble(numeroF));
        return CreatedAtAction(nameof(Insert), numeroF);
    }
}