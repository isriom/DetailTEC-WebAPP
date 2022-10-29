using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class Proveedor
    {
        public Proveedor()
        {
            InsumoProductos = new HashSet<InsumoProducto>();
        }

        public string CedulaJuridica { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string CorreoElectronico { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public string Contacto { get; set; } = null!;

        public virtual ICollection<InsumoProducto> InsumoProductos { get; set; }
    }
}
