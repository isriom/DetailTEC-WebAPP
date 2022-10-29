using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class Lavado
    {
        public Lavado()
        {
            Cita = new HashSet<Citum>();
            InsumoProductos = new HashSet<InsumoProducto>();
        }

        public string Tipo { get; set; } = null!;
        public int Costo { get; set; }
        public int Duracion { get; set; }
        public int PuntosRequeridos { get; set; }
        public int PuntosOrtorgados { get; set; }
        public int Precio { get; set; }
        public bool Lavador { get; set; }
        public bool Pulidor { get; set; }

        public virtual ICollection<Citum> Cita { get; set; }

        public virtual ICollection<InsumoProducto> InsumoProductos { get; set; }
    }
}
