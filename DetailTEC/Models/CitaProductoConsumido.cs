using PruebaDetail.Models;

namespace DetailTEC.Models
{
    public partial class CitaProductoConsumido
    {
        public int Placa { get; set; }
        public DateTime Fecha { get; set; }
        public string Sucursal { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Marca { get; set; } = null!;
        public int Cantidad { get; set; }

        public virtual Cita Citum { get; set; } = null!;
        public virtual InsumoProducto InsumoProducto { get; set; } = null!;
    }
}
