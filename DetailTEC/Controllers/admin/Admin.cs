using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DetailTEC.Controllers.admin;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Trabajador")]
/*
 * Controller class to cites manage WebApp
 */
public class Admin : Controller
{
    /**
     * Add cite to DB
     * Recieve a @CODE {Admin.CitaElement} and add it to the DB
     */
    [HttpPut]
    [Route("api/[controller]/{web}/add")]
    public ActionResult Register(string element, string web)
    {
        //logica para insertar en la base de datos aqui
        switch (web)
        {
            case "Citas":
                //logica de citas
                return Ok();
            case "Clientes":
                //logica de Clientes
                return Ok();
            case "Insumos":
                //logica de Insumos
                return Ok();
            case "Lavados":
                //logica de Lavados
                return Ok();
            case "Proveedores":
                //logica de Proveedores
                return Ok();
            case "Trabajadores":
                //logica de Trabajadores
                return Ok();
            case "Sucursales":
                //logica de Sucursales
                return Ok();
        }

        Console.Out.Write(element);
        Console.Out.Write(JsonSerializer.Serialize(element));
        return new OkResult();
    }

    /**
     * Get the list of cites with their data
     * Send the cites list with their as a JSON using the @CODE {Admin.CitaElement} as template
     */
    [HttpGet]
    [Route("api/[controller]/{web}/list")]
    public ActionResult Consult(string web)
    {
        //Logica para obtener la lista
        Element[]? listTest = Array.Empty<Element>();
        switch (web)
        {
            case "Citas":
                //logica de citas
                listTest = new[]
                {
                    new AdminData.CitaElement("Isaac", 1231, "15/22/23", 106040722,
                        "Lindora",
                        "servatilla",
                        true)
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Clientes":
                //logica de Clientes

                //Logica para obtener la lista de citas
                listTest = new[]
                {
                    new AdminData.ClienteElement("Isaac", 1231, "Barrios", "Campos",
                        "Isirom",
                        "sudo apt",
                        "2001isaacbc@gmail.com", 100)
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Insumos":
                //logica de Insumos
                listTest = new[]
                {
                    new AdminData.InsumoElement("LLanta",
                        "SUSUKY",
                        1500,
                        "GOLLO")
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Lavados":
                //logica de Lavados
                listTest = new[]
                {
                    new AdminData.LavadoElement(
                        "Premium",
                        1555,
                        2000,
                        15,
                        "11153",
                        true,
                        true,
                        250,
                        45)
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Proveedores":
                //logica de Proveedores
                listTest = new[]
                {
                    new AdminData.ProveedorElement(
                        "Spiderman",
                        "CS112233",
                        "Cerca de aqui",
                        24518653,
                        "11153@cuentaprueba.com")
                };

                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Trabajadores":
                //logica de Trabajadores
                listTest = new[]
                {
                    new AdminData.TrabajadorElement(
                        "isriom",
                        "barrios",
                        1,
                        "15/2/22",
                        "15/2/01",
                        11,
                        "contraseña",
                        "limpiador", "semanal")
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
            case "Sucursales":
                //logica de Sucursales
                listTest = new[]
                {
                    new AdminData.SucursalElement(
                        "SAN TEC",
                        "Cartago",
                        "Cartago",
                        "Cartago",
                        24582552,
                        "15/22/23",
                        2536465,
                        "15/858/95")
                };
                Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

                return Json(listTest);
        }
        Console.Out.Write("consult: " + JsonSerializer.Serialize(listTest));

        return Json(listTest);
    }

    /**
     * Function to update a cite
     * Update all the element atributes with the new values; In case that ald and new value are the same still update it.
     */
    [HttpPost]
    [Route("api/[controller]/{web}/update")]
    public ActionResult Update(string element, string web)
    {
        Console.Out.Write("update: ");
        switch (web)
        {
            case "Citas":
                //logica de citas
                return Ok();
            case "Clientes":
                //logica de Clientes
                return Ok();
            case "Insumos":
                //logica de Insumos
                return Ok();
            case "Lavados":
                //logica de Lavados
                return Ok();
            case "Proveedores":
                //logica de Proveedores
                return Ok();
            case "Trabajadores":
                //logica de Trabajadores
                return Ok();
            case "Sucursales":
                //logica de Sucursales
                return Ok();
        }

        Console.Out.Write("update: " + JsonSerializer.Serialize(element));

        return new AcceptedResult();
    }

    /**
     * Function to delete a cite
     * Recieve a Element and erase it from the DB
     */
    [HttpDelete]
    [Route("api/[controller]/{web}/Delete")]
    public ActionResult Delete(string element)
    {
        if (User.IsInRole("Trabajador"))
        {
            //logica para borrar una cita


            Console.Out.Write("Delete: " + JsonSerializer.Serialize(element));

            return new OkResult();
        }

        return BadRequest();
    }
}