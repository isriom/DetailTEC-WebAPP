using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using DetailTEC.Controllers.DB;

/**
 * Clase controladora de la base de datos creada en un archivo json
 */
public class DBController
{
    /**
     * Definicion de la base de datos que se va a utilizar
     */
    public static DBController DB;

    /**
     * Metodo de creacion de la estructura base de la base de datos la cual se componente de 4 listas
     */
    public DBController(cita[] citas, trabajador[] trabajadores, cliente[] clientes, Factura[] facturas)
    {
        Citas = new List<cita>(citas ?? throw new ArgumentNullException(nameof(citas)));
        Trabajadores = new List<trabajador>(trabajadores ?? throw new ArgumentNullException(nameof(trabajadores)));
        Clientes = new List<cliente>(clientes ?? throw new ArgumentNullException(nameof(clientes)));
        Facturas = new List<Factura>(facturas ?? throw new ArgumentNullException(nameof(facturas)));
        DB = this;
    }

    /**
     * Metodo constructor de la clase donde se crean instancias base
     */
    public DBController()
    {
        Citas = new List<cita>(
            new[] { new cita(new Data.Cita(), 1), new cita(new Data.Cita(), 2), new cita(new Data.Cita(), 3) } ??
            throw new ArgumentNullException(nameof(Citas)));
        Trabajadores =
            new List<trabajador>(new[]
            {
                new trabajador(new Data.GTrabajadores()), new trabajador(new Data.GTrabajadores()),
                new trabajador(new Data.GTrabajadores())
            } ?? throw new ArgumentNullException(nameof(Trabajadores)));
        Clientes = new List<cliente>(new[]
        {
            new cliente(new Data.G_clientes()), new cliente(new Data.G_clientes()), new cliente(new Data.G_clientes())
        } ?? throw new ArgumentNullException(nameof(Clientes)));
        Facturas = new List<Factura>(new[]
        {
            new Factura(new Data.Consulta_factura()), new Factura(new Data.Consulta_factura()),
            new Factura(new Data.Consulta_factura())
        } ?? throw new ArgumentNullException(nameof(Facturas)));
    }

    /**
     * Metodo de definicion y las funciones get y set para la manipulacion de la Entidad Cita
     */
    public List<cita> Citas { get; set; }

    /**
     * Metodo de definicion y las funciones get y set para la manipulacion de la Entidad Trabajadores
     */

    public List<trabajador> Trabajadores { get; set; }

    /**
     * Metodo de definicion y las funciones get y set para la manipulacion de la Entidad Clientes
     */

    public List<cliente> Clientes { get; set; }

    /**
     * Metodo de definicion y las funciones get y set para la manipulacion de los datos de la 
     */
    public List<Factura> Facturas { get; set; }

    /**
     * Metodo para obtener los datos del usuario actual en la base de datos
     */
    public static Data.G_ClientesVC GetdUser(string name)
    {
        foreach (var cliente in DB.Clientes)
            if (cliente.Usuario == name)
            {
                return cliente;
            }

        return new Data.G_ClientesVC();
    }


    /**
     * Metodo para encontrar el usuario dentro la base de datos y verificar el rol que cumple
     */
    public static string FoundUser(string name, string pass)
    {
        Console.Out.Write(pass);
        foreach (var trabajador in DB.Trabajadores)
            if (trabajador.Nombre == name && trabajador.Password == pass)
            {
                Console.Out.Write("trabajador");
                return "Trabajador";
            }

        foreach (var cliente in DB.Clientes)
            if (cliente.Usuario == name && cliente.Password == pass)
            {
                Console.Out.Write("cliente");
                return "Cliente";
            }

        return "No Found";
    }

    /**
     * Metodo para saber si la factura esta relacionada al cliente
     */
    public static bool IsOwner(string name, double? Nfactura)
    {
        foreach (var factura in DB.Facturas)
            if (factura.Cliente == name && factura.Numero_de_Factura == Nfactura)
            {
                Console.Out.Write(factura.Cliente);
                return true;
            }

        return false;
    }

    /**
     * Metodo para agregar la factura y la cita al la base de datos al mismo tiempo cuando se genera la factura 
     */
    public static void RegistrarCitayFactura(Data.Cita cita, double NO)
    {
        AddCita(cita, NO);
        AddFactura(cita, NO);
    }

    /**
     * Metodo para agregar la cita a la base de datos
     */
    public static void AddCita(Data.Cita cita, double No)
    {
        DB.Citas.Add(new cita(cita, No));
    }

    /**
     * Metodo para agregar la factura a la base de datos y actualizar el archivo
     */
    public static void AddFactura(Data.Cita cita, double No)
    {
        DB.Facturas.Add(new Factura(new Data.Consulta_factura(cita.Cliente, No)));
        save();
    }

    /**
     * Metodo para cargar el archivo .json a la API y poder manipularlo
     */
    public static void load()
    {
        var file = File.ReadAllText("./controllers/DB/DB.json");
        var data = JsonSerializer.Deserialize<DBController>(file);

        if (data != null) DB = data;
    }

    /**
     * Metodo para registrar el cliente en la vista Taller en la base de datos
     */
    public static void RegistrarTC(Data.G_clientes c)
    {
        DB.Clientes.Add(new cliente(c));
        save();
    }

    /**
     * Metodo para registrar el cliente en la vista Cliente en la base de datos
     */
    public static void RegistrarCC(Data.G_ClientesVC C)
    {
        foreach (var cliente in DB.Clientes)
            if (cliente.Usuario == C.Usuario)
            {
                cliente.Correo_electronico=C.Correo_electronico;
                cliente.Direccion_1=C.Direccion_1;
                cliente.Direccion_2=C.Direccion_2;
                cliente.Telefono_1=C.Telefono_1;
                cliente.Telefono_2=C.Telefono_2;
                cliente.Password=C.Password;
                cliente.Nombre_Completo=C.Nombre_Completo;
                save();
                return;
            }

    }

    /**
     * Metodo para registrar el Trabajador en la vista Taller en la base de datos
     */
    public static void RegistrarTT(Data.GTrabajadores T)
    {
        DB.Trabajadores.Add(new trabajador(T));
        Console.Write("Registrado");
        save();
    }

    /**
     * Metodo para poder actualizar el archivo json cuando se agregan nuevos datos 
     */
    public static void save()
    {
        var file = File.Create("./controllers/DB/DB.json");

        var data = JsonSerializer.Serialize(DB);
        var bytes = new UTF8Encoding(true).GetBytes(data);
        Console.Write(data);
        file.Write(bytes, 0, bytes.Length);
        file.Close();
    }

    /**
     * Metodo donde se crea el archivo json en la carpeta de DB del proyecto 
     */
    public static void init()
    {
        var file = File.Create("./controllers/DB/DB.json");
        var controller = new DBController();
        Console.Write(controller);
        Console.Write(controller.Citas.Count);

        var data = JsonSerializer.Serialize(controller);
        var bytes = new UTF8Encoding(true).GetBytes(data);
        Console.Write(bytes);
        Console.Write(data);
        file.Write(bytes, 0, bytes.Length);
        file.Close();
    }

    /**
     * Clase donde se maneja la estructura de la cita que se inserta al archivo json con la informacion tomada del API
     */
    public class cita : Data.Cita
    {
        /**
         * Metodo constructor de la clase
         */
        public cita()
        {
        }

        /**
         * Metodo donde se define la estructura de la cita  y los datos que se toman 
         */
        public cita(Data.Cita cita, double No)
        {
            Cliente = cita.Cliente;
            Placa_del_Vehiculo = cita.Placa_del_Vehiculo;
            Sucursal = cita.Sucursal;
            Servicio_solicitado = cita.Servicio_solicitado;
            Number = No;
        }

        /**
         * Metodo de get y set para manejar el numero de la factura 
         */
        public double Number { get; set; }
    }

    /**
     * Clase donde se maneja la estructura de la trabajador que se inserta al archivo json con la informacion tomada del API
     */
    public class trabajador : Data.GTrabajadores
    {
        /**
         * Metodo de constructor 
         */
        public trabajador()
        {
        }

        /**
         * Metodo donde se define la estructura del trabajador que sea va a agregar a la base de datos 
         */
        public trabajador(Data.GTrabajadores trabajador)
        {
            Nombre = trabajador.Nombre;
            Apellidos = trabajador.Apellidos;
            Numero_Cedula = trabajador.Numero_Cedula;
            Fecha_Ingreso = trabajador.Fecha_Ingreso;
            Fecha_Nacimiento = trabajador.Fecha_Nacimiento;
            Edad = trabajador.Edad;
            Password = trabajador.Password;
            Rol = trabajador.Rol;
        }
    }

    /**
     * Clase donde se la estructura del cliente en general para la base de datos 
     */
    public class cliente : Data.G_ClientesVC
    {
        /**
         * Metodo Constructor
         */
        public cliente()
        {
        }

        /**
         * Metodo donde se registran los datos del cliente desde la vista Taller y se generan las contrasenas aleatorias para agregarlos a la base de datos
         */
        public cliente(Data.G_clientes cliente)
        {
            Nombre_Completo = cliente.Nombre_Completo;
            Correo_electronico = cliente.Correo_electronico;
            Cedula = cliente.Cedula;
            Direccion_1 = cliente.Direccion_1;
            Direccion_2 = cliente.Direccion_2;
            Telefono_1 = cliente.Telefono_1;
            Telefono_2 = cliente.Telefono_2;
            Usuario = cliente.Usuario;
            byte[] tmp = { };
            double No = 0;
            if (Nombre_Completo != null)
            {
                tmp = MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(Nombre_Completo));
                for (var i = 0; i < tmp.Length; i++) No += tmp[i] * Math.Pow(2, i);
            }

            Password = No.ToString();
        }

        /**
         * Metodo donde se registran los datos del cliente desde la vista del Cliente 
         */
        public cliente(Data.G_ClientesVC cliente)
        {
            Nombre_Completo = cliente.Nombre_Completo;
            Correo_electronico = cliente.Correo_electronico;
            Cedula = cliente.Cedula;
            Direccion_1 = cliente.Direccion_1;
            Direccion_2 = cliente.Direccion_2;
            Telefono_1 = cliente.Telefono_1;
            Telefono_2 = cliente.Telefono_2;
            Usuario = cliente.Usuario;
            Password = cliente.Password;
        }
    }

    /**
     * Clase donde se maneja la estructura de la factura 
     */
    public class Factura : Data.Consulta_factura
    {
        /**
         * Metodo Constructor de la clase
         */
        public Factura()
        {
        }

        /**
         * Metodo de donde se registran lso datos del API para ingregarlos a la base de datos 
         */
        public Factura(Data.Consulta_factura factura)
        {
            Cliente = factura.Cliente;
            Numero_de_Factura = factura.Numero_de_Factura;
        }
    }
}