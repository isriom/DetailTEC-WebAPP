namespace DetailTEC.Models
{
    public partial class ClienteTelefono
    {
        public int Cedula { get; set; }
        public string? Telefono { get; set; }

        public virtual Cliente CedulaNavigation { get; set; } = null!;
    }
}
