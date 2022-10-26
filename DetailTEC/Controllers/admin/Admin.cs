using System.Text.Json;
using DetailTEC.Models;
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
    private readonly DetailTECContext _context;

    public Admin(DetailTECContext context)
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
        JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
        {
            WriteIndented = true
        };
        //logica para insertar en la base de datos aqui
        switch (web)
        {
            case "Citas":
                //logica de citas

                var cita = JsonSerializer.Deserialize<AdminData.CitaElement>(element, options);
                _context.Cita.Add(cita.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Clientes":
                //logica de Clientes
                var cliente = JsonSerializer.Deserialize<AdminData.ClienteElement>(element, options);
                _context.Clientes.Add(cliente.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Insumos":
                //logica de Insumos
                var insumo = JsonSerializer.Deserialize<AdminData.InsumoElement>(element, options);
                _context.InsumoProductos.Add(insumo.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Lavados":
                //logica de Lavados
                var lavado = JsonSerializer.Deserialize<AdminData.LavadoElement>(element, options);
                _context.Lavados.Add(lavado.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Proveedores":
                //logica de Proveedores
                var proveedor = JsonSerializer.Deserialize<AdminData.ProveedorElement>(element, options);
                _context.Proveedors.Add(proveedor.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Trabajadores":
                //logica de Trabajadores
                Console.Out.Write(element.ToString());
                var trabajador = element.Deserialize<AdminData.TrabajadorElement>(options);
                Console.Out.Write(trabajador);
                _context.Trabajadors.Add(trabajador.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Sucursales":
                //logica de Sucursales
                var sucursal = JsonSerializer.Deserialize<AdminData.SucursalElement>(element, options);
                _context.Sucursals.Add(sucursal.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
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
            case "Citas":
                //logica de citas
                listTest = _context.Cita.Select(cita => new AdminData.CitaElement(cita)).ToArray();
                return Json(listTest);
            case "Clientes":
                //logica de Clientes
                listTest = _context.Clientes.Select(cliente => new AdminData.ClienteElement(cliente)).ToArray();
                return Json(listTest);
            case "Insumos":
                //logica de Insumos
                listTest = _context.InsumoProductos.Select(insumo => new AdminData.InsumoElement(insumo)).ToArray();
                return Json(listTest);
            case "Lavados":
                //logica de Lavados
                listTest = _context.Lavados.Select(lavado => new AdminData.LavadoElement(lavado)).ToArray();
                return Json(listTest);
            case "Proveedores":
                //logica de Proveedores
                listTest = _context.Proveedors.Select(proveedor => new AdminData.ProveedorElement(proveedor)).ToArray();
                return Json(listTest);
            case "Trabajadores":
                //logica de Trabajadores
                var list = new List<AdminData.TrabajadorElement>();
                foreach (var element in _context.Trabajadors.Select(trabajador =>
                             new AdminData.TrabajadorElement(trabajador)))
                    list.Add(element);
                listTest = list
                    .ToArray();
                return Json(listTest);
            case "Sucursales":
                //logica de Sucursales
                listTest = _context.Sucursals.Select(sucursal => new AdminData.SucursalElement(sucursal)).ToArray();
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
            case "Citas":
                //logica de citas
                var updater = element.Deserialize<AdminData.CitaElement>();
                var cita = _context.Cita.Find(updater.placa, updater.fecha, updater.sucursal);
                updater.UpdateModel(cita);
                _context.SaveChanges();
                return Ok();
            case "Clientes":
                //logica de Clientes
                var updaterCliente =
                    element.Deserialize<AdminData.ClienteElement>();
                var cliente = _context.Clientes.Find(updaterCliente.cedula);
                updaterCliente.UpdateModel(cliente);
                _context.SaveChanges();
                return Ok();
            case "Insumos":
                //logica de Insumos
                var updaterInsumo =
                    element.Deserialize<AdminData.InsumoElement>();
                var Insumo = _context.InsumoProductos.Find(updaterInsumo.nombre, updaterInsumo.marca);
                updaterInsumo.UpdateModel(Insumo);
                _context.SaveChanges();
                return Ok();
            case "Lavados":
                //logica de Lavados
                var updaterLavado =
                    element.Deserialize<AdminData.LavadoElement>();
                var Lavado = _context.Lavados.Find(updaterLavado.nombre);
                updaterLavado.UpdateModel(Lavado);
                _context.SaveChanges();
                return Ok();
            case "Proveedores":
                //logica de Proveedores
                var updaterProveedor =
                    element.Deserialize<AdminData.ProveedorElement>();
                var Proveedor = _context.Proveedors.Find(updaterProveedor.juridica);
                updaterProveedor.UpdateModel(Proveedor);
                _context.SaveChanges();
                return Ok();
            case "Trabajadores":
                //logica de Trabajadores
                var updaterTrabajador =
                    element.Deserialize<AdminData.TrabajadorElement>();
                var Trabajador = _context.Trabajadors.Find(updaterTrabajador.cedula);
                updaterTrabajador.UpdateModel(Trabajador);
                _context.SaveChanges();
                return Ok();
            case "Sucursales":
                //logica de Sucursales
                var updaterSucursal =
                    element.Deserialize<AdminData.SucursalElement>();
                var Sucursal = _context.Sucursals.Find(updaterSucursal.nombre);
                updaterSucursal.UpdateModel(Sucursal);
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
            case "Citas":
                //logica de citas
                var toDeleteCitum = _context.Cita.Find(element);
                _context.Cita.Remove(toDeleteCitum);
                return new OkResult();


            case "Clientes":
                //logica de Clientes
                var toDeleteClient = _context.Clientes.Find(element);
                _context.Clientes.Remove(toDeleteClient);
                return new OkResult();


            case "Insumos":
                var name = element[0];
                var brand = element[1];
                //logica de Insumos
                var toDeleteProduct = _context.InsumoProductos.Find(element);
                _context.InsumoProductos.Remove(toDeleteProduct);
                return new OkResult();

            case "Lavados":
                //logica de Lavados
                var toDeleteWash = _context.Lavados.Find(element);
                _context.Lavados.Remove(toDeleteWash);
                return new OkResult();


            case "Proveedores":
                //logica de Proveedores
                var toDeleteProvider = _context.Proveedors.Find(element);
                _context.Proveedors.Remove(toDeleteProvider);
                return new OkResult();


            case "Trabajadores":
                //logica de Trabajadores
                var toDeleteWorker = _context.Trabajadors.Find(element);
                _context.Trabajadors.Remove(toDeleteWorker);
                return new OkResult();


            case "Sucursales":
                //logica de Sucursales
                var toDeleteBranch = _context.Sucursals.Find(element);
                _context.Sucursals.Remove(toDeleteBranch);
                return new OkResult();
        }


        return new OkResult();
    }
}