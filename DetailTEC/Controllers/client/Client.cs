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
        var user = _context.Clientes.First(cliente => cliente.Usuario == User.ToString());
        switch (web)
        {
        }

        switch (web)
        {
            case "RPuntos":
                //logica de Puntos
                var listCitas = _context.Cita.Where(x => x.Cedula == user.Cedula).ToList();
                var listPuntos = listCitas.Select(cita => new AdminData.RPuntos(cita)).ToList();

                return Json(listPuntos);
            case "RCitas":
                var list = _context.Cita.Where(x => x.Cedula == user.Cedula).ToList();
                var listCita = list.Select(cita => new AdminData.CitaElement(cita)).ToList();

                return Json(listCita);
            case "Usuario":
                //logica de Clientes
                var cliente = _context.Clientes.First(x => x.Usuario == User.ToString());
                var listCliente = new AdminData.ClienteElement(cliente);
                var listClientes = new List<AdminData.ClienteElement> { listCliente };
                Console.Out.Write(Json(listTest).ToJson());
                return Json(listClientes);
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
                var updater = element.Deserialize<AdminData.CitaElement>();
                var cita = _context.Cita.Find(updater.placa, updater.fecha, updater.sucursal);
                updater.cedula = cita.Cedula;
                updater.nombre = cita.Nombre;
                updater.monto = (int)cita.Monto;
                updater.iva = (int)cita.Iva;
                _context.SaveChanges();
                updater.UpdateModel(cita);
                return Ok();
            case "RClientes":
                //logica de Clientes
                var update = element.Deserialize<AdminData.ClienteElement>();
                var cliente = _context.Clientes.Find(update.cedula);
                update.UpdateModel(cliente);
                _context.SaveChanges();
                return Ok();
            case "Usuario":
                //logica de Insumos
                var updateCliente = element.Deserialize<AdminData.ClienteElement>();
                var cliente1 = _context.Clientes.Find(updateCliente.cedula);
                updateCliente.UpdateModel(cliente1);
                _context.SaveChanges();
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
                var cita = _context.Cita.Find(element);
                _context.Cita.Remove(cita);
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