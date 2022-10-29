using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class InsumoProducto
    {
        public InsumoProducto()
        {
            CitaProductoConsumidos = new HashSet<CitaProductoConsumido>();
            CedulaJuridicas = new HashSet<Proveedor>();
            Tipos = new HashSet<Lavado>();
        }

        public string NombreIP { get; set; } = null!;
        public string Marca { get; set; } = null!;
        public int Costo { get; set; }
        public int Cantidad { get; set; }

        public virtual ICollection<CitaProductoConsumido> CitaProductoConsumidos { get; set; }

        public virtual ICollection<Proveedor> CedulaJuridicas { get; set; }
        public virtual ICollection<Lavado> Tipos { get; set; }
    }
}
