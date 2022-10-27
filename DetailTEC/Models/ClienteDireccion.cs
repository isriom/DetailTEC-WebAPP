namespace DetailTEC.Models
{
    public partial class ClienteDireccion
    {
        public string Cedula { get; set; } = null!;
        public string Direccion { get; set; } = null!;

        public virtual Cliente CedulaNavigation { get; set; } = null!;
    }
}
