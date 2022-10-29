using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class CitaProductoConsumido
    {
        public int Placa { get; set; }
        public DateTime Fecha { get; set; }
        public string Sucursal { get; set; } = null!;
        public string NombreIP { get; set; } = null!;
        public string Marca { get; set; } = null!;
        public int Cantidad { get; set; }

        public virtual Citum Citum { get; set; } = null!;
        public virtual InsumoProducto InsumoProducto { get; set; } = null!;
    }
}
