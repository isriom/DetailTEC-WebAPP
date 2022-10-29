﻿using System.Text.Json;
using System.Text.Json.Serialization;
using DetailTEC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

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
            WriteIndented = true,
            ReferenceHandler = ReferenceHandler.Preserve
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

            case "Direccion":
                //logica de Dirreccion
                var dirreccion = JsonSerializer.Deserialize<AdminData.DireccionElement>(element, options);
                _context.ClienteDireccions.Add(dirreccion.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();

            case "Telefono":
                //logica de Telefono
                var telefono = JsonSerializer.Deserialize<AdminData.TelefonoElement>(element, options);
                _context.ClienteTelefonos.Add(telefono.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();

            case "CitasInsumos":
                //logica de CitasInsumos
                var citasInsumos = JsonSerializer.Deserialize<AdminData.ProductoCita>(element, options);
                _context.CitaProductoConsumidos.Add(citasInsumos.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();

            case "CitasTrabajador":
                //logica de citas
                var citaTrabajador = JsonSerializer.Deserialize<AdminData.CitaTrabajadorElement>(element, options);
                var citaforadd = _context.Cita.Find(citaTrabajador.PlacaAuto, citaTrabajador.FechaCita,
                    citaTrabajador.Sucursal);
                var trabajadorforadd = _context.Trabajadors.Find(citaTrabajador.Cedula);
                citaforadd.Cedulas.Add(trabajadorforadd);
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();

            case "InsumoLavado":
                var insumoLavado = JsonSerializer.Deserialize<AdminData.ProductoLavadoElement>(element, options);
                var lavadoForAdd = _context.Lavados.Include(X => X.InsumoProductos)
                    .First(x => x.Tipo == insumoLavado.tipo);
                var insumoForAdd = _context.InsumoProductos.First(x =>
                    x.NombreIP == insumoLavado.NombreIP && x.Marca == insumoLavado.Marca);
                lavadoForAdd.InsumoProductos.Add(insumoForAdd);
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();

            case "ProveedorProductos":
                //logica de ProveedorProductos
                var proveedorProducto = JsonSerializer.Deserialize<AdminData.ProveedorProducto>(element, options);
                var productoforadd = _context.InsumoProductos.Find(proveedorProducto.nombre, proveedorProducto.Marca);
                var proveedortoadd = _context.Proveedors.Find(proveedorProducto.cedula);
                productoforadd.CedulaJuridicas.Add(proveedortoadd);
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            case "Gerente":
                //logica de Gerente
                var gerente = JsonSerializer.Deserialize<AdminData.GerenteElement>(element, options);
                _context.TrabajadorSucursals.Add(gerente.Model());
                _context.SaveChanges();
                Console.Out.Write(element);
                return Ok();
            default:
                return BadRequest();
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
    [Route("api/[controller]/{web}/list/{id}")]
    [Route("api/[controller]/{web}/list/{id}/{id2}")]
    [Route("api/[controller]/{web}/list/{id}/{id2}/{id3}")]
    public ActionResult Consult(string web, string? id, string? id2, string? id3)
    {
        //Logica para obtener la lista
        var listTest = Array.Empty<Element>();
        Models.Cliente Client_reference;
        Console.Out.Write(" consult: " + JsonSerializer.Serialize(web));
        JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
        {
            WriteIndented = true,
            ReferenceHandler = ReferenceHandler.Preserve
        };
        switch (web)
        {
            case "Citas":
                //logica de citas
                listTest = _context.Cita.Select(cita => new AdminData.CitaElement(cita)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Clientes":
                //logica de Clientes
                listTest = _context.Clientes.Select(cliente => new AdminData.ClienteElement(cliente)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Insumos":
                //logica de Insumos
                listTest = _context.InsumoProductos.Select(insumo => new AdminData.InsumoElement(insumo)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Lavados":
                //logica de Lavados
                listTest = _context.Lavados.Select(lavado => new AdminData.LavadoElement(lavado)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Proveedores":
                //logica de Proveedores
                listTest = _context.Proveedors.Select(proveedor => new AdminData.ProveedorElement(proveedor)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Trabajadores":
                //logica de Trabajadores
                var list = new List<AdminData.TrabajadorElement>();
                foreach (var element in _context.Trabajadors.Select(trabajador =>
                             new AdminData.TrabajadorElement(trabajador)))
                    list.Add(element);
                listTest = list
                    .ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Sucursales":
                //logica de Sucursales
                listTest = _context.Sucursals.Select(sucursal => new AdminData.SucursalElement(sucursal)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "Direccion":
                //logica de Dirreccion
                Client_reference = _context.Clientes.First(x => x.Cedula == id);
                var clienteDuieecion = _context.ClienteDireccions.Where(X => X.Cedula == Client_reference.Cedula)
                    .ToArray();
                listTest = clienteDuieecion.Select(dirreccion => new AdminData.DireccionElement(dirreccion)).ToArray();
                Console.Out.Write(listTest.Length);
                _context.SaveChanges();
                return Json(listTest);
            case "Telefono":
                //logica de Telefono
                Client_reference = _context.Clientes.First(x => x.Cedula == id);
                var telefono = _context.ClienteTelefonos.Where(x => x.Cedula == Client_reference.Cedula).ToArray();
                listTest = telefono.Select(tel => new AdminData.TelefonoElement(tel)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "CitasInsumos":
                //logica de CitaInsumos
                CitaProductoConsumido[] listCitaInsumos = _context.CitaProductoConsumidos.ToArray();
                var listtempInsumos = listCitaInsumos
                    .Where(x => ((DateTimeOffset)x.Fecha).ToUnixTimeMilliseconds().ToString() == id2).ToArray();
                listTest = listCitaInsumos.Select(citaInsumo => new AdminData.ProductoCita(citaInsumo)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "CitasTrabajadores":
                //logica de CitaTrabajador
                Citum[] listCitaTrabajadores = _context.Cita.Include(x => x.Cedulas).ToArray();
                var listtempTrabajadores = listCitaTrabajadores
                    .Where(x => ((DateTimeOffset)x.Fecha).ToUnixTimeMilliseconds().ToString() == id2).FirstOrDefault(x=>x.Placa.ToString()==id&& x.Sucursal==id3);
                var listCedula = listtempTrabajadores.Cedulas.ToArray();
                AdminData.CitaTrabajadorElement[] listCitumTrabajadores={};
                listTest = listCedula.Select(cedula => new AdminData.CitaTrabajadorElement(cedula,listtempTrabajadores)).ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "InsumoLavado":
                //logica de InsumoLavadors
                var listLavadors = _context.Lavados.Include(x => x.InsumoProductos).First(x => x.Tipo == id);
                var insumoLavadors = listLavadors.InsumoProductos.ToArray();
                listTest = insumoLavadors.Select(insumoLavador =>
                        new AdminData.ProductoLavadoElement(insumoLavador, listLavadors))
                    .ToArray();
                _context.SaveChanges();
                return Json(listTest);
            case "ProveedorProductos":
                //logica de ProveedorProductos
                var ProveedorProductos = _context.InsumoProductos.Include(x => x.CedulaJuridicas)
                    .First(x => x.NombreIP == id && x.Marca == id2);
                var listproveedorProductos = ProveedorProductos.CedulaJuridicas.ToList();
                listTest = listproveedorProductos.Select(proveedorProducto =>
                        new AdminData.ProveedorProducto(proveedorProducto, ProveedorProductos))
                    .ToArray();
                _context.SaveChanges();
                return Json(listTest, options);
            case "Gerente":
                //logica de Gerente
                var listGerente = _context.TrabajadorSucursals.Where(x => x.Nombre == id);
                listTest = listGerente.Select(gerente => new AdminData.GerenteElement(gerente)).ToArray();
                _context.SaveChanges();
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
                updaterCliente.cedula = cliente.Cedula;
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
                _context.SaveChanges();
                return new OkResult();


            case "Clientes":
                //logica de Clientes
                var toDeleteClient = _context.Clientes.Find(element);
                _context.Clientes.Remove(toDeleteClient);
                _context.SaveChanges();
                return new OkResult();


            case "Insumos":
                var name = element[0];
                var brand = element[1];
                //logica de Insumos
                var toDeleteProduct = _context.InsumoProductos.Find(element);
                _context.InsumoProductos.Remove(toDeleteProduct);
                _context.SaveChanges();
                return new OkResult();

            case "Lavados":
                //logica de Lavados
                var toDeleteWash = _context.Lavados.Find(element);
                _context.Lavados.Remove(toDeleteWash);
                _context.SaveChanges();
                return new OkResult();


            case "Proveedores":
                //logica de Proveedores
                var toDeleteProvider = _context.Proveedors.Find(element);
                _context.Proveedors.Remove(toDeleteProvider);
                _context.SaveChanges();
                return new OkResult();


            case "Trabajadores":
                //logica de Trabajadores
                var toDeleteWorker = _context.Trabajadors.Find(element);
                _context.Trabajadors.Remove(toDeleteWorker);
                _context.SaveChanges();
                return new OkResult();


            case "Sucursales":
                //logica de Sucursales
                var toDeleteBranch = _context.Sucursals.Find(element);
                _context.Sucursals.Remove(toDeleteBranch);
                _context.SaveChanges();
                return new OkResult();
            case "Direccion":
                //logica de Direccion
                var toDeleteAddres = _context.ClienteDireccions.Find(element);
                _context.ClienteDireccions.Remove(toDeleteAddres);
                _context.SaveChanges();
                return new OkResult();
            case "Telefono":
                //logica de Telefono
                var toDeletePhone = _context.ClienteTelefonos.Find(element);
                _context.ClienteTelefonos.Remove(toDeletePhone);
                _context.SaveChanges();
                return new OkResult();


            case "CitasInsumos":
                //logica de Insumos citas
                var toDeleteCitaInsumo = _context.CitaProductoConsumidos.Find(element);
                _context.CitaProductoConsumidos.Remove(toDeleteCitaInsumo);
                _context.SaveChanges();
                return new OkResult();
            case "CitasTrabajador":
                //logica de trabajador en citas
                var toDeleteCitaTrabajador = _context.Cita.Find(element[0], element[1], element[2]);
                var toDeleteTrabajador = toDeleteCitaTrabajador.Cedulas.First(x => x.Cedula == element[3]);
                toDeleteCitaTrabajador.Cedulas.Remove(toDeleteTrabajador);
                _context.SaveChanges();
                return new OkResult();


            case "InsumoLavado":
                //logica de Insumo lavado
                var toDeleteInsumoLavado = _context.Lavados.Include(x => x.InsumoProductos)
                    .FirstOrDefault(x => x.Tipo == element[0]);
                var toDeleteInsumo =
                    toDeleteInsumoLavado.InsumoProductos.First(x => x.NombreIP == element[1] && x.Marca == element[2]);
                toDeleteInsumoLavado.InsumoProductos.Remove(toDeleteInsumo);
                _context.SaveChanges();

                return new OkResult();


            case "ProveedorProductos":
                //logica de Proveedor productos
                var toDeleteProveedorProducto = _context.Proveedors.Include(x => x.InsumoProductos)
                    .First(x => x.CedulaJuridica == element[0]);
                var toDeleteProducto =
                    toDeleteProveedorProducto.InsumoProductos.First(x =>
                        x.NombreIP == element[1] && x.Marca == element[2]);
                toDeleteProveedorProducto.InsumoProductos.Remove(toDeleteProducto);
                _context.SaveChanges();

                return new OkResult();


            case "Gerente":
                //logica de Gerente
                var toDeleteGerente = _context.TrabajadorSucursals.Find(element);
                _context.TrabajadorSucursals.Remove(toDeleteGerente);
                _context.SaveChanges();

                return new OkResult();
        }


        return new OkResult();
    }
}