namespace DetailTEC.Models
{
    public partial class Trabajador
    {
        public Trabajador()
        {
            TrabajadorSucursals = new HashSet<TrabajadorSucursal>();
            Cita = new HashSet<Cita>();
        }

        public int Cedula { get; set; }
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

        public virtual ICollection<Cita> Cita { get; set; }
    }
}
