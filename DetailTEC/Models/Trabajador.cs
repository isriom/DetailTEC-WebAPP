using System;
using System.Collections.Generic;

namespace DetailTEC.Models
{
    public partial class Trabajador
    {
        public Trabajador()
        {
            TrabajadorSucursals = new HashSet<TrabajadorSucursal>();
            Cita = new HashSet<Citum>();
        }

        public string Cedula { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Apellido1 { get; set; } = null!;
        public string? Apellido2 { get; set; }
        public DateTime FechaDeNacimiento { get; set; }
        public int Edad { get; set; }
        public string Rol { get; set; } = null!;
        public string TipoDePago { get; set; } = null!;
        public string PasswordT { get; set; } = null!;
        public DateTime FechaDeIngreso { get; set; }

        public virtual ICollection<TrabajadorSucursal> TrabajadorSucursals { get; set; }

        public virtual ICollection<Citum> Cita { get; set; }
    }
}
