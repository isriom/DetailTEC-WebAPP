namespace DetailTEC.Controllers.admin;

public class AdminData
{
    public class CitaElement
    {
        public CitaElement(string nombre, int placa, string fecha, int cedula, string tipo, string sucursal,
            bool puntos)
        {
            this.nombre = nombre;
            this.placa = placa;
            this.fecha = fecha;
            this.cedula = cedula;
            this.tipo = tipo;
            this.sucursal = sucursal;
            this.puntos = puntos;
        }

        public CitaElement()
        {
        }

        public string nombre { get; set; }
        public int placa { get; set; }
        public string fecha { get; set; }
        public int cedula { get; set; }
        public string tipo { get; set; }
        public string sucursal { get; set; }
        public bool puntos { get; set; }
    }

    public class ClienteElement
    {
        public ClienteElement(string nombre, string cedula, string apellido1, string apellido2, string usuario,
            string password, string correo, int puntos)
        {
            this.nombre = nombre;
            this.cedula = cedula;
            apellido_1 = apellido1;
            apellido_2 = apellido2;
            this.usuario = usuario;
            this.password = password;
            this.correo = correo;
            this.puntos = puntos;
        }

        public ClienteElement()
        {
        }

        public string nombre { get; set; }
        public string cedula { get; set; }
        public string apellido_1 { get; set; }
        public string apellido_2 { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public string correo { get; set; }
        public int puntos { get; set; }
    }

    public class InsumoElement
    {
        public InsumoElement(string nombre, string marca, int costo, string proveedores)
        {
            this.nombre = nombre;
            this.marca = marca;
            this.costo = costo;
            this.proveedores = proveedores;
        }

        public InsumoElement()
        {
        }

        public string nombre { get; set; }
        public string marca { get; set; }
        public int costo { get; set; }
        public string proveedores { get; set; }
    }

    public class LavadoElement
    {
        public LavadoElement(string nombre, string costo, string precio, string duracion, int productos, string lavador,
            string pulidor, string puntuacionCoste, string fechaPuntuacionCoste)
        {
            this.nombre = nombre;
            this.costo = costo;
            this.precio = precio;
            this.duracion = duracion;
            this.productos = productos;
            this.lavador = lavador;
            this.pulidor = pulidor;
            puntuacion_coste = puntuacionCoste;
            fecha_puntuacion_coste = fechaPuntuacionCoste;
        }

        public LavadoElement()
        {
        }

        public string nombre { get; set; }
        public string costo { get; set; }
        public string precio { get; set; }
        public string duracion { get; set; }
        public int productos { get; set; }
        public string lavador { get; set; }
        public string pulidor { get; set; }
        public string puntuacion_coste { get; set; }
        public string fecha_puntuacion_coste { get; set; }
    }

    public class ProveedorElement
    {
        public ProveedorElement(string nombre, string juridica, string direccion, int contacto, string correo)
        {
            this.nombre = nombre;
            this.juridica = juridica;
            this.direccion = direccion;
            this.contacto = contacto;
            this.correo = correo;
        }

        public ProveedorElement()
        {
        }

        public string nombre { get; set; }
        public string juridica { get; set; }
        public string direccion { get; set; }
        public int contacto { get; set; }
        public string correo { get; set; }
    }

    public class SucursalElement
    {
        public SucursalElement(string nombre, string provincia, string canton, string distrito, int telefono,
            string fechaDeApertura, string gerente, string fechaGerente)
        {
            this.nombre = nombre;
            this.provincia = provincia;
            this.canton = canton;
            this.distrito = distrito;
            this.telefono = telefono;
            fecha_de_apertura = fechaDeApertura;
            this.gerente = gerente;
            fecha_gerente = fechaGerente;
        }

        public SucursalElement()
        {
        }

        public string nombre { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public int telefono { get; set; }
        public string fecha_de_apertura { get; set; }
        public string gerente { get; set; }
        public string fecha_gerente { get; set; }
    }

    public class TrabajadorElement
    {
        public TrabajadorElement(string nombre, string apellidos, int cedula, string fechaDeIngreso,
            string fechaDeNacimiento, int edad, string password, string rol, int pago)
        {
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.cedula = cedula;
            fecha_de_ingreso = fechaDeIngreso;
            fecha_de_nacimiento = fechaDeNacimiento;
            this.edad = edad;
            this.password = password;
            this.rol = rol;
            this.pago = pago;
        }

        public TrabajadorElement()
        {
        }

        public string nombre { get; set; }
        public string apellidos { get; set; }
        public int cedula { get; set; }
        public string fecha_de_ingreso { get; set; }
        public string fecha_de_nacimiento { get; set; }
        public int edad { get; set; }
        public string password { get; set; }
        public string rol { get; set; }
        public int pago { get; set; }
    }
}