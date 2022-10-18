using PruebaDetail.Models;

namespace DetailTEC.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Cita = new HashSet<Cita>();
        }

        public int Cedula { get; set; }
        public string? Nombre { get; set; }
        public string Apellido1 { get; set; } = null!;
        public string? Apellido2 { get; set; }
        public string Usuario { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public int Puntos { get; set; }

        public virtual ClienteDireccion? ClienteDireccion { get; set; }
        public virtual ClienteTelefono? ClienteTelefono { get; set; }
        public virtual ICollection<Cita> Cita { get; set; }
    }
}
