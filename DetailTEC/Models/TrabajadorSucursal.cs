using PruebaDetail.Models;

namespace DetailTEC.Models
{
    public partial class TrabajadorSucursal
    {
        public int Cedula { get; set; }
        public string Nombre { get; set; } = null!;
        public DateTime FechaDeInicio { get; set; }

        public virtual Trabajador CedulaNavigation { get; set; } = null!;
        public virtual Sucursal NombreNavigation { get; set; } = null!;
    }
}
