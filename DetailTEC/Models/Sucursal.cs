namespace DetailTEC.Models
{
    public partial class Sucursal
    {
        public Sucursal()
        {
            Cita = new HashSet<Cita>();
            TrabajadorSucursals = new HashSet<TrabajadorSucursal>();
        }

        public string Nombre { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Provincia { get; set; } = null!;
        public string Canton { get; set; } = null!;
        public string Distrito { get; set; } = null!;
        public DateTime FechaDeApertura { get; set; }

        public virtual ICollection<Cita> Cita { get; set; }
        public virtual ICollection<TrabajadorSucursal> TrabajadorSucursals { get; set; }
    }
}
