namespace DetailTEC.Models
{
    public partial class ClienteDireccion
    {
        public int Cedula { get; set; }
        public string? Direccion { get; set; }

        public virtual Cliente CedulaNavigation { get; set; } = null!;
    }
}
