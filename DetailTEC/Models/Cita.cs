using PruebaDetail.Models;

namespace DetailTEC.Models
{
    public partial class Cita
    {
        public Cita()
        {
            CitaProductoConsumidos = new HashSet<CitaProductoConsumido>();
            Cedulas = new HashSet<Trabajador>();
        }

        public int Placa { get; set; }
        public DateTime Fecha { get; set; }
        public string Sucursal { get; set; } = null!;
        public string Tipo { get; set; } = null!;
        public int Cedula { get; set; }
        public string Nombre { get; set; } = null!;
        public string ServicioBrindado { get; set; } = null!;
        public int Puntos { get; set; }
        public int? Monto { get; set; }
        public int? Iva { get; set; }

        public virtual Cliente CedulaNavigation { get; set; } = null!;
        public virtual Sucursal SucursalNavigation { get; set; } = null!;
        public virtual Lavado TipoNavigation { get; set; } = null!;
        public virtual ICollection<CitaProductoConsumido> CitaProductoConsumidos { get; set; }

        public virtual ICollection<Trabajador> Cedulas { get; set; }
    }
}
