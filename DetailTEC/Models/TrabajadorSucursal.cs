namespace DetailTEC.Models
{
    public partial class TrabajadorSucursal
    {
        public string Cedula { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public DateTime FechaDeInicio { get; set; }

        public virtual Trabajador CedulaNavigation { get; set; } = null!;
        public virtual Sucursal NombreNavigation { get; set; } = null!;
    }
}
