namespace DetailTEC.Controllers.admin;

public abstract class Element
{
}

public class AdminData
{
    public class CitaElement : Element
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

    public class ClienteElement : Element
    {
        public ClienteElement(string nombre, int cedula, string apellido1, string apellido2, string usuario,
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
        public int cedula { get; set; }
        public string apellido_1 { get; set; }
        public string apellido_2 { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public string correo { get; set; }
        public int puntos { get; set; }
    }

    public class InsumoElement : Element
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

    public class LavadoElement : Element
    {
        public LavadoElement(string nombre, int costo, int precio, int duracion, string productos, bool lavador,
            bool pulidor, int puntuacionCoste, int puntuacionGanancia)
        {
            this.nombre = nombre;
            this.costo = costo;
            this.precio = precio;
            this.duracion = duracion;
            this.productos = productos;
            this.lavador = lavador;
            this.pulidor = pulidor;
            puntuacion_coste = puntuacionCoste;
            puntuacion_ganancia = puntuacionGanancia;
        }

        public LavadoElement()
        {
        }

        public string nombre { get; set; }
        public int costo { get; set; }

        public int precio { get; set; }

        //minutes
        public int duracion { get; set; }
        public string productos { get; set; }
        public bool lavador { get; set; }
        public bool pulidor { get; set; }
        public int puntuacion_coste { get; set; }
        public int puntuacion_ganancia { get; set; }
    }

    public class ProveedorElement : Element
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

    public class SucursalElement : Element
    {
        public SucursalElement(string nombre, string provincia, string canton, string distrito, int telefono,
            string fechaDeApertura, int gerente, string fechaGerente)
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
        public int gerente { get; set; }
        public string fecha_gerente { get; set; }
    }

    public class TrabajadorElement : Element
    {
        public TrabajadorElement(string nombre, string apellidos, int cedula, string fechaDeIngreso,
            string fechaDeNacimiento, int edad, string password, string rol, string pago)
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
        public string pago { get; set; }
    }
}