using System.Text.Json;
using DetailTEC.Controllers.admin;
using DetailTEC.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace DetailTEC.Controllers.client;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Cliente")]
/*
 * Controller class to cites manage WebApp
 */
public class Client : Controller
{
    private readonly DetailTECContext _context;
    private JsonSerializerOptions options = new(JsonSerializerDefaults.Web);

    public Client(DetailTECContext context)
    {
        Element.Context = context;
        _context = context;
    }

    /**
     * Add cite to DB
     * Recieve a @CODE {Admin.CitaElement} and add it to the DB
     */
    [HttpPut]
    [Route("api/[controller]/{web}/add")]
    public ActionResult Register([FromBody] JsonElement element, string web)
    {
        //logica para insertar en la base de datos aqui
        switch (web)
        {
            case "RCitas":
                //logica de citas
                var cita = element.Deserialize<AdminData.CitaElement>(options);
                var client = _context.Clientes.First(x => x.Usuario == User.ToString());
                if (cita == null) return BadRequest();
                cita.cedula = client.Cedula;
                cita.nombre = client.NombreCompleto;
                var monto = _context.Lavados.FirstOrDefault(x => x.Tipo == cita.tipo);
                if (monto == null)
                {
                    return BadRequest();
                }

                cita.monto = monto.Precio;
                cita.iva = (int)(cita.monto * 0.13);
                _context.Cita.Add(cita.Model());
                _context.SaveChanges();
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
        var listTest = Array.Empty<Element>();
        Console.Out.Write(" consult: " + JsonSerializer.Serialize(web));

        switch (web)
        {
            case "RPuntos":
                //logica de Puntos
                listTest = new[]
                {
                    new AdminData.RPuntos("Isaac", 1231, "15/22/23", "106040722",
                        "Lindora",
                        "servatilla",
                        true, 150, 190, -100)
                };

                return Json(listTest);
            case "RCitas":
                //logica de Citas

                //Logica para obtener la lista de citas
                listTest = new[]
                {
                    new AdminData.CitaElement("Isaac", 1231, "15/22/23", "106040722",
                        "Lindora",
                        "servatilla",
                        true, 150, 190)
                };

                return Json(listTest);
            case "Usuario":
                //logica de Citas

                //Logica para obtener la lista de citas
                listTest = new[]
                {
                    new AdminData.ClienteElement("Isaac Barrios Campos", "1231",
                        "Isriom",
                        "NG genereate component constraseña",
                        "true@gmail.com", 150)
                };
                Console.Out.Write(Json(listTest).ToJson());
                return Json(listTest);
        }

        return Json(listTest);
    }

    /**
     * Function to update a cite
     * Update all the element atributes with the new values; In case that ald and new value are the same still update it.
     */
    [HttpPost]
    [Route("api/[controller]/{web}/update")]
    public ActionResult Update([FromBody] JsonElement element, string web)
    {
        Console.Out.Write("update: ");
        switch (web)
        {
            case "RCitas":
                //logica de citas
                return Ok();
            case "RClientes":
                //logica de Clientes
                return Ok();
            case "Usuario":
                //logica de Insumos
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
    [Route("api/[controller]/{web}/delete")]
    public ActionResult Delete([FromBody] string[] element, string web)
    {
        //logica para borrar una cita
        Console.Out.Write("Delete: " + element[0]);

        switch (web)
        {
            case "RCitas":
                //logica de citas
                return new OkResult();
        }

        return new OkResult();
    }

    [HttpGet]
    [Route("api/[controller]/{web}/kinds")]
    public ActionResult Kinds(string web)
    {
        var list = _context.Lavados.Select(kind => kind.Tipo).ToList();
        return Json(list);
    }

    [HttpGet]
    [Route("api/[controller]/{web}/branchs")]
    public ActionResult Branchs(string web)
    {
        var list = _context.Sucursals.Select(branch => branch.Nombre).ToList();
        return Json(list);
    }

}