using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace DetailTEC.Controllers.DB.Facturas;

/**
 * Clase que maneja la creacion de los pdf para las facturas
 */
public static class PdfHandler
{
    /**
     * Metodo que  genera la nueva factura generando un numero para identificarlas
     */
    public static string FacturaCita(Data.Cita cita)

    {
        byte[] name;
        double no = 0;
        name = MD5.Create()
            .ComputeHash(Encoding.UTF8.GetBytes(cita.Cliente + cita.Servicio_solicitado + cita.Sucursal));
        for (var i = 0; i < name.Length; i++) no += name[i] * Math.Pow(2, i);

        Console.Out.Write(no);

        var bill = new PdfDocument(new PdfWriter("Facturas/F" + no + ".pdf"));
        var layoutDocument = new Document(bill);
        //TITULO
        layoutDocument.SetFontSize(38f);
        layoutDocument.Add(new Paragraph("FACTURA No." + no).SetBold().SetTextAlignment(TextAlignment.CENTER));
        //Informacion Cita
        AddClientdata(layoutDocument, cita);
        //Desglose de Servicios
        AddServices(layoutDocument, cita);
        layoutDocument.Close();
        CreateMetaData(cita, no.ToString(CultureInfo.InvariantCulture));
        return no.ToString(CultureInfo.InvariantCulture);
    }

    /**
     * Metodo que agrega los datos del cliente que solicito la cita a la factura
     */
    public static void AddClientdata(Document layoutDocument, Data.Cita cita)
    {
        layoutDocument.SetFontSize(12.5f);
        layoutDocument.Add(new LineSeparator(new SolidLine())).SetBorder(Border.NO_BORDER);

        var tabla = new Table(4, false);
        tabla.AddCell(new Paragraph("Cliente: "))
            .AddCell(new Paragraph(cita.Cliente));
        tabla.AddCell(new Paragraph("Fecha: "))
            .AddCell(new Paragraph(DateTime.Now.ToString("G")));

        tabla.AddCell("Sucursal: ")
            .AddCell(new Paragraph(cita.Sucursal));
        tabla.AddCell(new Paragraph("Mecanico: "));
        if (cita.GetMecanico() == null)
            tabla.AddCell("");
        else
            tabla.AddCell(new Paragraph(cita.GetMecanico()));

        tabla.AddCell(new Paragraph("Vehiculo: "))
            .AddCell(new Paragraph(cita.Placa_del_Vehiculo.ToString()));
        tabla.AddCell(new Paragraph("Rol:"))
            .AddCell(new Paragraph("WIP"));

        tabla.SetWidth(UnitValue.CreatePercentValue(100));

        layoutDocument.Add(new Paragraph("Cita"));
        layoutDocument.Add(new LineSeparator(new DashedLine()));
        RemoveBorder(tabla);
        layoutDocument.Add(tabla).SetBorder(Border.NO_BORDER);
    }

    /**
     * Metodo que agrega los datos del servicio solicitado a la factura
     */
    public static void AddServices(Document layoutDocument, Data.Cita cita)
    {
        layoutDocument.SetFontSize(12.5f);
        layoutDocument.Add(new LineSeparator(new SolidLine())).SetBorder(Border.NO_BORDER);

        var tabla = new Table(3, false);
        tabla.AddCell(new Paragraph("Servicio: "))
            .AddCell(new Paragraph("cantidad"))
            .AddCell(new Paragraph("Precio"));

        tabla.AddCell(new Paragraph(cita.Servicio_solicitado))
            .AddCell(new Paragraph("Place holder"))
            .AddCell(new Paragraph("Place holder"));

        tabla.SetWidth(UnitValue.CreatePercentValue(100));

        layoutDocument.Add(new Paragraph("Desglose"));
        layoutDocument.Add(new LineSeparator(new DashedLine()));
        layoutDocument.Add(tabla);
    }

    /**
     * Metodo para remover el borde a la tabla donde se agregaron los elementos de la factura
     */
    public static void RemoveBorder(Table table)
    {
        foreach (var element1 in table.GetChildren())
        {
            var element = (Cell)element1;
            element.SetBorder(Border.NO_BORDER);
        }
    }

    /**
     * Metodo para obtener los datos que se ingresaron en el Registro de Citas
     */
    public static void CreateMetaData(Data.Cita cita, string No)
    {
        var file = File.Create("./Facturas/Metadata/M" + No + ".json");

        var data = JsonSerializer.Serialize(cita);
        var bytes = new UTF8Encoding(true).GetBytes(data);
        Console.Write(bytes);
        Console.Write(data);
        file.Write(bytes, 0, bytes.Length);
        file.Close();
    }
}