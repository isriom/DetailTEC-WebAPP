using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class Citum
    {
        public Citum()
        {
            CitaProductoConsumidos = new HashSet<CitaProductoConsumido>();
            Cedulas = new HashSet<Trabajador>();
        }

        public int Placa { get; set; }
        public DateTime Fecha { get; set; }
        public string Sucursal { get; set; } = null!;
        public string Tipo { get; set; } = null!;
        public string Cedula { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public bool Puntos { get; set; }
        public int? Monto { get; set; }
        public int? Iva { get; set; }

        public virtual Cliente CedulaNavigation { get; set; } = null!;
        public virtual Sucursal SucursalNavigation { get; set; } = null!;
        public virtual Lavado TipoNavigation { get; set; } = null!;
        public virtual ICollection<CitaProductoConsumido> CitaProductoConsumidos { get; set; }

        public virtual ICollection<Trabajador> Cedulas { get; set; }
    }
}
