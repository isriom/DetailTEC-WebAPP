using System.Globalization;
using DetailTEC.Models;

namespace DetailTEC.Controllers.admin;

public abstract class Element
{
    internal static DetailTECContext Context { get; set; } = null;
}

public class AdminData
{
    public class CitaElement : Element
    {
        public CitaElement(string nombre, int placa, string fecha, string cedula, string tipo, string sucursal,
            bool puntos, int monto, int iva)
        {
            this.nombre = nombre;
            this.placa = placa;
            this.fecha = fecha;
            this.cedula = cedula;
            this.tipo = tipo;
            this.sucursal = sucursal;
            this.puntos = puntos;
            this.iva = iva;
            this.monto = monto;
        }

        public CitaElement()
        {
        }

        public CitaElement(Citum cita)
        {
            nombre = cita.Nombre;
            placa = cita.Placa;
            fecha = cita.Fecha.ToString(CultureInfo.InvariantCulture);
            cedula = cita.Cedula;
            tipo = cita.Tipo;
            sucursal = cita.Sucursal;
            puntos = cita.Puntos;
            iva = cita.Iva ?? 0;
            monto = cita.Monto ?? 0;
        }

        public string nombre { get; set; }
        public int placa { get; set; }
        public string fecha { get; set; }

        public string cedula { get; set; }

        //Lavado key
        public string tipo { get; set; }
        public string sucursal { get; set; }
        public bool puntos { get; set; }
        public int monto { get; set; }
        public int iva { get; set; }

        /**
         *method to create a Model Citum from a Citaelement
         */
        public Citum Model()
        {
            var cita = new Citum();
            UpdateModel(cita);
            cita.Cedula = cedula;
            cita.Placa = placa;
            return cita;
        }


        public void UpdateModel(Citum cita)
        {
            cita.Fecha = Convert.ToDateTime(fecha);
            cita.Tipo = tipo;
            cita.Puntos = puntos;
            cita.Sucursal = sucursal;
            cita.Nombre = Context.Clientes.FirstOrDefault(c => c.Cedula == cedula).NombreCompleto;
            cita.Monto = Context.Lavados.FirstOrDefault(l => l.Tipo == tipo).Precio;
            cita.Iva = (int?)(monto * 0.13);
        }
    }

    public class ClienteElement : Element
    {
        public ClienteElement(string nombre, string cedula, string usuario,
            string password, string correo, int puntos)
        {
            this.nombre = nombre;
            this.cedula = cedula;
            this.usuario = usuario;
            this.password = password;
            this.correo = correo;
            this.puntos = puntos;
        }

        public ClienteElement()
        {
        }

        public ClienteElement(Cliente cliente)
        {
            nombre = cliente.NombreCompleto;
            cedula = cliente.Cedula;
            usuario = cliente.Usuario;
            password = cliente.Password;
            correo = cliente.Correo;
            puntos = cliente.Puntos.Value;
        }

        public string nombre { get; set; }
        public string cedula { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public string correo { get; set; }
        public int puntos { get; set; }

        public Cliente Model()
        {
            var cliente = new Cliente();
            UpdateModel(cliente);
            cliente.Cedula = cedula;
            return cliente;
        }

        public void UpdateModel(Cliente cliente)
        {
            cliente.NombreCompleto = nombre;
            cliente.Usuario = usuario;
            cliente.Password = password;
            cliente.Correo = correo;
            cliente.Puntos = puntos;
        }
    }

    public class InsumoElement : Element
    {
        public InsumoElement(string nombre, string marca, int costo, int cantidad)
        {
            this.nombre = nombre;
            this.marca = marca;
            this.costo = costo;
            this.cantidad = cantidad;
        }

        public InsumoElement()
        {
        }

        public InsumoElement(InsumoProducto insumo)
        {
            nombre = insumo.NombreIP;
            marca = insumo.Marca;
            costo = insumo.Costo;
            cantidad = insumo.Cantidad;
        }

        public string nombre { get; set; }
        public string marca { get; set; }
        public int costo { get; set; }
        public int cantidad { get; set; }

        public InsumoProducto Model()
        {
            var insumo = new InsumoProducto();
            UpdateModel(insumo);
            insumo.NombreIP = nombre;
            return insumo;
        }

        public void UpdateModel(InsumoProducto insumo)
        {
            insumo.Marca = marca;
            insumo.Costo = costo;
            insumo.Cantidad = cantidad;
        }
    }

    public class LavadoElement : Element
    {
        public LavadoElement(string nombre, int costo, int precio, int duracion, bool lavador,
            bool pulidor, int puntuacionCoste, int puntuacionGanancia)
        {
            this.nombre = nombre;
            this.costo = costo;
            this.precio = precio;
            this.duracion = duracion;
            this.lavador = lavador;
            this.pulidor = pulidor;
            puntuacion_coste = puntuacionCoste;
            puntuacion_ganancia = puntuacionGanancia;
        }

        public LavadoElement()
        {
        }

        public LavadoElement(Lavado lavado)
        {
            nombre = lavado.Tipo;
            costo = lavado.Costo;
            precio = lavado.Precio;
            duracion = lavado.Duracion;
            lavador = lavado.Lavador;
            pulidor = lavado.Pulidor;
            puntuacion_coste = lavado.PuntosRequeridos;
            puntuacion_ganancia = lavado.PuntosOrtorgados;
        }

        public string nombre { get; set; }
        public int costo { get; set; }

        public int precio { get; set; }

        //minutes
        public int duracion { get; set; }
        public bool lavador { get; set; }
        public bool pulidor { get; set; }
        public int puntuacion_coste { get; set; }
        public int puntuacion_ganancia { get; set; }

        public Lavado Model()
        {
            var lavado = new Lavado();
            UpdateModel(lavado);
            return lavado;
        }

        public void UpdateModel(Lavado lavado)
        {
            lavado.Tipo = nombre;
            lavado.Costo = costo;
            lavado.Precio = precio;
            lavado.Duracion = duracion;
            lavado.Lavador = lavador;
            lavado.Pulidor = pulidor;
            lavado.PuntosRequeridos = puntuacion_coste;
            lavado.PuntosOrtorgados = puntuacion_ganancia;
        }
    }

    public class ProveedorElement : Element
    {
        public ProveedorElement(string nombre, string juridica, string direccion, string contacto, string correo)
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

        public ProveedorElement(Proveedor proveedor)
        {
            nombre = proveedor.Nombre;
            juridica = proveedor.CedulaJuridica;
            direccion = proveedor.Direccion;
            contacto = proveedor.Contacto;
            correo = proveedor.CorreoElectronico;
        }

        public string nombre { get; set; }
        public string juridica { get; set; }
        public string direccion { get; set; }
        public string contacto { get; set; }
        public string correo { get; set; }

        public Proveedor Model()
        {
            var proveedor = new Proveedor();
            UpdateModel(proveedor);
            proveedor.CedulaJuridica = juridica;
            return proveedor;
        }

        public void UpdateModel(Proveedor proveedor)
        {
            proveedor.Nombre = nombre;
            proveedor.Direccion = direccion;
            proveedor.Contacto = contacto;
            proveedor.CorreoElectronico = correo;
        }
    }

    public class SucursalElement : Element
    {
        public SucursalElement(string nombre, string provincia, string canton, string distrito, string telefono,
            string fechaDeApertura)
        {
            this.nombre = nombre;
            this.provincia = provincia;
            this.canton = canton;
            this.distrito = distrito;
            this.telefono = telefono;
            fecha_de_apertura = fechaDeApertura;
        }

        public SucursalElement()
        {
        }

        public SucursalElement(Sucursal sucursal)
        {
            nombre = sucursal.Nombre;
            provincia = sucursal.Provincia;
            canton = sucursal.Canton;
            distrito = sucursal.Distrito;
            telefono = sucursal.Telefono;
            fecha_de_apertura = sucursal.FechaDeApertura.ToString();
        }

        public string nombre { get; set; }
        public string provincia { get; set; }
        public string canton { get; set; }
        public string distrito { get; set; }
        public string telefono { get; set; }
        public string fecha_de_apertura { get; set; }

        public Sucursal Model()
        {
            var sucursal = new Sucursal();
            UpdateModel(sucursal);
            return sucursal;
        }

        public void UpdateModel(Sucursal sucursal)
        {
            sucursal.Nombre = nombre;
            sucursal.Provincia = provincia;
            sucursal.Canton = canton;
            sucursal.Distrito = distrito;
            sucursal.Telefono = telefono;
            sucursal.FechaDeApertura = DateTime.Parse(fecha_de_apertura);
        }
    }

    public class TrabajadorElement : Element
    {
        public TrabajadorElement(string nombre, string apellido1, string apellido2, string cedula,
            string fechaDeIngreso,
            string fechaDeNacimiento, int edad, string password, string rol, string pago)
        {
            this.nombre = nombre;
            this.apellido1 = apellido1;
            this.apellido2 = apellido2;
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

        public TrabajadorElement(Trabajador trabajador)
        {
            nombre = trabajador.Nombre;
            apellido1 = trabajador.Apellido1;
            apellido2 = trabajador.Apellido2;
            cedula = trabajador.Cedula;
            fecha_de_ingreso = trabajador.FechaDeIngreso.ToShortDateString();
            fecha_de_nacimiento = trabajador.FechaDeNacimiento.ToShortDateString();
            edad = trabajador.Edad;
            password = trabajador.PasswordT;
            rol = trabajador.Rol;
            pago = trabajador.TipoDePago;
        }

        public string apellido1 { get; set; }

        public string apellido2 { get; set; }

        public string nombre { get; set; }
        public string cedula { get; set; }
        public string fecha_de_ingreso { get; set; }
        public string fecha_de_nacimiento { get; set; }
        public int edad { get; set; }
        public string password { get; set; }
        public string rol { get; set; }
        public string pago { get; set; }

        public Trabajador Model()
        {
            var trabajador = new Trabajador();
            UpdateModel(trabajador);
            trabajador.Cedula = cedula;
            return trabajador;
        }

        public void UpdateModel(Trabajador trabajador)
        {
            trabajador.Nombre = nombre;
            trabajador.Apellido1 = apellido1;
            trabajador.Apellido2 = apellido2;
            trabajador.FechaDeIngreso = DateTime.Parse(fecha_de_ingreso);
            trabajador.FechaDeNacimiento = DateTime.Parse(fecha_de_nacimiento);
            trabajador.Edad = (int)((DateTime.Now - trabajador.FechaDeNacimiento).TotalDays / 365);
            trabajador.PasswordT = password;
            trabajador.Rol = rol;
            trabajador.TipoDePago = pago;
        }
    }

    /**
 * Representative class to show user points
 */
    public class RPuntos : CitaElement
    {
        public RPuntos(string nombre, int placa, string fecha, string cedula, string tipo, string sucursal, bool puntos,
            int monto, int iva, int puntaje) : base(nombre, placa, fecha, cedula, tipo, sucursal, puntos, monto, iva)
        {
            this.puntaje = puntaje;
        }

        public RPuntos(string nombre, int placa, string fecha, string cedula, string tipo, string sucursal, bool puntos,
            int monto, int iva) : base(nombre, placa, fecha, cedula, tipo, sucursal, puntos, monto, iva)
        {
            if (this.puntos)
                puntaje = -1 * Context.Lavados.Find(this.tipo).PuntosRequeridos;
            else
                puntaje = Context.Lavados.Find(this.tipo).PuntosOrtorgados;
        }

        public RPuntos(int puntaje)
        {
            this.puntaje = puntaje;
        }

        public RPuntos(Citum cita)
        {
            this.nombre = cita.Nombre;
            this.placa = cita.Placa;
            this.fecha = cita.Fecha.ToShortDateString();
            this.cedula = cita.Cedula;
            this.tipo = cita.Tipo;
            this.sucursal = cita.Sucursal;
            this.puntos = cita.Puntos;
            this.monto = (cita.Monto ?? 0);
            this.iva = (cita.Iva ?? 0);
            if (this.puntos)
                puntaje = -1 * Context.Lavados.Find(this.tipo).PuntosRequeridos;
            else
                puntaje = Context.Lavados.Find(this.tipo).PuntosOrtorgados;
        }

        public int puntaje { get; set; }
    }

    public class DireccionElement : Element
    {
        public DireccionElement(string cedula, string direccion)
        {
            Cedula = cedula;
            Direccion = direccion;
        }

        public DireccionElement()
        {
        }

        public DireccionElement(ClienteDireccion direccion)
        {
            Cedula = direccion.Cedula;
            Direccion = direccion.Direccion;
        }

        public ClienteDireccion Model()
        {
            var direccion = new ClienteDireccion();
            UpdateModel(direccion);
            return direccion;
        }

        public void UpdateModel(ClienteDireccion direccion)
        {
            direccion.Cedula = Cedula;
            direccion.Direccion = Direccion;
        }

        public string Cedula { get; set; } = null!;
        public string Direccion { get; set; } = null!;
    }


    public class TelefonoElement : Element
    {
        public TelefonoElement(string cedula, string telefono)
        {
            Cedula = cedula;
            Telefono = telefono;
        }

        public TelefonoElement()
        {
        }

        public TelefonoElement(ClienteTelefono telefono)
        {
            Cedula = telefono.Cedula;
            Telefono = telefono.Telefono;
        }

        public ClienteTelefono Model()
        {
            var telefono = new ClienteTelefono();
            UpdateModel(telefono);
            return telefono;
        }

        public void UpdateModel(ClienteTelefono telefono)
        {
            telefono.Cedula = Cedula;
            telefono.Telefono = Telefono;
        }

        public string Cedula { get; set; } = null!;
        public string Telefono { get; set; } = null!;
    }

    public class CitaTrabajadorElement : Element
    {
        public CitaTrabajadorElement(int placaAuto, DateTime fechaCita, string sucursal, string cedula)
        {
            PlacaAuto = placaAuto;
            FechaCita = fechaCita;
            Sucursal = sucursal;
            Cedula = cedula;
        }

        public CitaTrabajadorElement()
        {
        }

        public CitaTrabajadorElement(Trabajador Trabajador, Citum cita)
        {
            PlacaAuto = cita.Placa;
            FechaCita = cita.Fecha;
            Sucursal = cita.Sucursal;
            Cedula = Trabajador.Cedula;
        }

        public CitaTrabajador Model()
        {
            var citaTrabajador = new CitaTrabajador();
            UpdateModel(citaTrabajador);
            return citaTrabajador;
        }

        public void UpdateModel(CitaTrabajador citaTrabajador)
        {
            citaTrabajador.PlacaAuto = PlacaAuto;
            citaTrabajador.FechaCita = FechaCita;
            citaTrabajador.Sucursal = Sucursal;
            citaTrabajador.Cedula = Cedula;
        }

        public int PlacaAuto { get; set; }
        public DateTime FechaCita { get; set; }
        public string Sucursal { get; set; }
        public string Cedula { get; set; }
    }

    public class ProductoLavadoElement : Element
    {
        public ProductoLavadoElement(string nombreIp, string marca, string tipo)
        {
            NombreIP = nombreIp;
            Marca = marca;
            tipo = tipo;
        }

        public ProductoLavadoElement()
        {
        }

        public ProductoLavadoElement(InsumoProducto productoLavado, Lavado lavado)
        {
            NombreIP = productoLavado.NombreIP;
            Marca = productoLavado.Marca;
            tipo = lavado.Tipo;
        }

        public InsumoProductoLavado Model()
        {
            var productoLavado = new InsumoProductoLavado();
            UpdateModel(productoLavado);
            return productoLavado;
        }

        public void UpdateModel(InsumoProductoLavado productoLavado)
        {
            productoLavado.NombreIP = NombreIP;
            productoLavado.Marca = Marca;
        }


        public string NombreIP { get; set; }
        public string Marca { get; set; }

        public string tipo { get; set; }
    }

    public class ProveedorProducto : Element
    {
        public ProveedorProducto(string cedula, string nombre, string marca)
        {
            this.cedula = cedula;
            this.nombre = nombre;
            Marca = marca;
        }

        public ProveedorProducto()
        {
        }

        public ProveedorProducto(Models.Proveedor proveedorProducto, Models.InsumoProducto Producto)
        {
            cedula = proveedorProducto.CedulaJuridica;
            nombre = Producto.NombreIP;
            Marca = Producto.Marca;
        }

        
        public string cedula { get; set; }

        public string nombre { get; set; }

        public string Marca { get; set; }
    }

    public class GerenteElement : Element
    {
        public GerenteElement(string cedula, string nombre, DateTime fechaDeInicio)
        {
            Cedula = cedula;
            Nombre = nombre;
            FechaDeInicio = fechaDeInicio;
        }

        public GerenteElement()
        {
        }

        public GerenteElement(TrabajadorSucursal gerente)
        {
            Cedula = gerente.Cedula;
            Nombre = gerente.Nombre;
            FechaDeInicio = gerente.FechaDeInicio;
        }

        public TrabajadorSucursal Model()
        {
            var gerente = new TrabajadorSucursal();
            UpdateModel(gerente);
            return gerente;
        }

        public void UpdateModel(TrabajadorSucursal gerente)
        {
            gerente.Cedula = Cedula;
            gerente.Nombre = Nombre;
            gerente.FechaDeInicio = FechaDeInicio;
        }


        public string Cedula { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public DateTime FechaDeInicio { get; set; }
    }

    public class ProductoCita : Element
    {
        public ProductoCita(int placa, DateTime fecha, string sucursal, string nombreIp, string marca, int cantidad)
        {
            Placa = placa;
            Fecha = fecha;
            Sucursal = sucursal;
            NombreIP = nombreIp;
            Marca = marca;
            Cantidad = cantidad;
        }

        public ProductoCita()
        {
        }

        public ProductoCita(CitaProductoConsumido productoCita)
        {
            Placa = productoCita.Placa;
            Fecha = productoCita.Fecha;
            Sucursal = productoCita.Sucursal;
            NombreIP = productoCita.NombreIP;
            Marca = productoCita.Marca;
            Cantidad = productoCita.Cantidad;
        }

        public CitaProductoConsumido Model()
        {
            var productoCita = new CitaProductoConsumido();
            UpdateModel(productoCita);
            return productoCita;
        }

        public void UpdateModel(CitaProductoConsumido productoCita)
        {
            productoCita.Placa = Placa;
            productoCita.Fecha = Fecha;
            productoCita.Sucursal = Sucursal;
            productoCita.NombreIP = NombreIP;
            productoCita.Marca = Marca;
            productoCita.Cantidad = Cantidad;
        }

        public int Placa { get; set; }
        public DateTime Fecha { get; set; }
        public string Sucursal { get; set; } = null!;
        public string NombreIP { get; set; } = null!;
        public string Marca { get; set; } = null!;
        public int Cantidad { get; set; }
    }
}