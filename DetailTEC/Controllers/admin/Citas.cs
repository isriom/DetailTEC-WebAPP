using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static DetailTEC.Controllers.admin.AdminData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace DetailTEC.Controllers.admin;

/**
 * Autorization and authentication required
 */
[ApiController]
[Authorize(Roles = "Trabajador")]
/*
 * Controller class to client manage WebApp
 */
public class Citas : Controller
{
    /**
     * Add cite to DB
     * Recieve a @CODE {Admin.CitaElement} and add it to the DB
     */
    [HttpPut]
    [Route("api/[controller]/add")]
    public ActionResult Register(CitaElement cite)
    {
        //logica para insertar en la base de datos aqui


        Console.Out.Write(cite);
        Console.Out.Write(JsonSerializer.Serialize(cite));
        return new OkResult();
    }

    /**
     * Get the list of cites with their data
     * Send the cites list with their as a JSON using the @CODE {Admin.CitaElement} as template
     */
    [HttpGet]
    [Route("api/[controller]/list")]
    public ActionResult Consult()
    {
        //Logica para obtener la lista de citas
        CitaElement[] listTest = new[]
        {
            new CitaElement("Isaac", 1231, "15/22/23", 106040722,
                "Lindora",
                "servatilla",
                true)
        };
        Console.Out.Write("consult: "+JsonSerializer.Serialize(listTest));

        return Json(listTest);
    }

    /**
     * Function to update a cite
     * Update all the elements with the new values; In case that ald and new value are the same still update it.
     */
    [HttpPost]
    [Route("api/[controller]/update")]
    public ActionResult Update(CitaElement cite)
    {        Console.Out.Write("update: ");

        if (User.IsInRole("Trabajador"))
        {
            //logica para actualizar una cita
        }

        Console.Out.Write("update: "+JsonSerializer.Serialize(cite));

        return new AcceptedResult();
    }

    /**
     * Function to delete a cite
     * Recieve a CitaElement and erase it from the DB
     */
    [HttpDelete]
    [Route("api/[controller]/Delete")]
    public ActionResult Delete(CitaElement data)
    {
        if (User.IsInRole("Trabajador"))
        {
            //logica para borrar una cita
        }

        Console.Out.Write("Delete: "+JsonSerializer.Serialize(data));

        return new OkResult();
    }
}