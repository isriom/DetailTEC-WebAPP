namespace DetailTEC.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Cita = new HashSet<Citum>();
            ClienteDireccions = new HashSet<ClienteDireccion>();
            ClienteTelefonos = new HashSet<ClienteTelefono>();
        }

        public string? NombreCompleto { get; set; }
        public string Cedula { get; set; } = null!;
        public DateTime? FechaDeNacimientoC { get; set; }
        public string Usuario { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public int? Puntos { get; set; }

        public virtual ICollection<Citum> Cita { get; set; }
        public virtual ICollection<ClienteDireccion> ClienteDireccions { get; set; }
        public virtual ICollection<ClienteTelefono> ClienteTelefonos { get; set; }
    }
}
