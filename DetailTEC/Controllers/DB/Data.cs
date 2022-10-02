namespace DetailTEC.Controllers.DB;

/**
 * Clase donde se maneja toda la estructura de los datos que se van a almacenar en la base de datos
 */
public class Data
{
 /**
     * Clase Padre para manejar los datos de la cita
     */
 public class Cita
    {
        /**
         * Metodo constructor de la clase
         */
        public Cita()
        {
            Cliente = "";
            Placa_del_Vehiculo = null;
            Sucursal = "";
            Servicio_solicitado = "";
        }

        /**
         * Metodo set y get para el nombre del cliente
         */
        public string Cliente { get; set; }

        /**
         * Metodo set y get para manejar la placa del vehiculo
         */
        public int? Placa_del_Vehiculo { get; set; }

        /**
         * Metodo set y get para manejar la Sucursal
         */
        public string? Sucursal { get; set; }

        /**
         * Metodo set y get para manejar el Servicio Solicitado
         */
        public string? Servicio_solicitado { get; set; }

        /**
         * Metodo set y get para manejar el mecanico
         */
        private string? Mecanico { get; set; }

        /**
         * Metodo para obtener el mecanico
         */
        public string? GetMecanico()
        {
            return Mecanico;
        }
    }

 /**
     * Clase padre que maneja la estructura de los datos que se guardan de los trabajadores
     */
 public class GTrabajadores
    {
     /**
         * Metodo constructor de la clase
         */
     public GTrabajadores()
        {
            Nombre = "";
            Apellidos = "";
            Numero_Cedula = null;
            Fecha_Ingreso = "";
            Fecha_Nacimiento = "";
            Edad = null;
            Password = "";
            Rol = "";
        }

        /**
         * Metodo get y set para el manejo del Nombre del Trabajador
         */
        public string? Nombre { get; set; }

        /**
         * Metodo get y set para el manejo de los Apellidos del Trabajador
         */
        public string? Apellidos { get; set; }

        /**
         * Metodo get y set para el manejo del Numero de Cedula del Trabajador
         */
        public int? Numero_Cedula { get; set; }

        /**
         * Metodo get y set para el manejo de la Fecha de Ingreso del Trabajador
         */
        public string? Fecha_Ingreso { get; set; }

        /**
         * Metodo get y set para el manejo de la Fecha de Nacimiento del Trabajador
         */
        public string? Fecha_Nacimiento { get; set; }

        /**
         * Metodo get y set para el manejo de la Edad del Trabajador
         */
        public int? Edad { get; set; }

        /**
         * Metodo get y set para el manejo de la Password del Trabajador
         */
        public string? Password { get; set; }

        /**
         * Metodo get y set para el manejo del Rol del Trabajador
         */
        public string? Rol { get; set; }
    }

    /**
     * Clase que maneja la estructura de los datos que se guarda de los clientes en Vista Trabajador
     */
    public class G_clientes
    {
     /**
         * Metodo constructor de la clase
         */
     public G_clientes()
        {
            Nombre_Completo = "";
            Correo_electronico = "";
            Cedula = null;
            Direccion_1 = "";
            Direccion_2 = "";
            Telefono_1 = null;
            Telefono_2 = null;
            Usuario = "";
        }

        /**
         * Metodo get y set para manejar el Nombre del Cliente desde Vista Taller
         */
        public string? Nombre_Completo { get; set; }

        /**
         * Metodo get y set para manejar la Cedula del Cliente desde Vista Taller
         */
        public int? Cedula { get; set; }

        /**
         * Metodo get y set para manejar la Correo del Cliente desde Vista Taller
         */
        public string? Correo_electronico { get; set; }

        /**
         * Metodo get y set para manejar la Direccion 1 del Cliente desde Vista Taller
         */
        public string? Direccion_1 { get; set; }

        /**
         * Metodo get y set para manejar la Direccion 2 del Cliente desde Vista Taller
         */
        public string? Direccion_2 { get; set; }

        /**
         * Metodo get y set para manejar la Telefono 1 del Cliente desde Vista Taller
         */
        public int? Telefono_1 { get; set; }

        /**
         * Metodo get y set para manejar la Telefono 2 del Cliente desde Vista Taller
         */
        public int? Telefono_2 { get; set; }

        /**
         * Metodo get y set para manejar el Usuario del Cliente desde Vista Taller
         */
        public string? Usuario { get; set; }
    }

    /**
     * Clase padre que maneja la estructura de los datos que se guarda de los clientes
     */
    public class G_ClientesVC
    {
     /**
         * Metodo constructor de la clase
         */
     public G_ClientesVC()
        {
            Nombre_Completo = "";
            Correo_electronico = "";
            Cedula = null;
            Direccion_1 = "";
            Direccion_2 = "";
            Telefono_1 = null;
            Telefono_2 = null;
            Usuario = "";
            Password = "";
        }

        /**
         * Metodo get y set para manejar el Nombre del Cliente desde Vista Cliente
         */
        public string? Nombre_Completo { get; set; }

        /**
         * Metodo get y set para manejar el Cedula del Cliente desde Vista Cliente
         */
        public int? Cedula { get; set; }

        /**
         * Metodo get y set para manejar el Correo del Cliente desde Vista Cliente
         */
        public string? Correo_electronico { get; set; }

        /**
         * Metodo get y set para manejar el Direccion 1 del Cliente desde Vista Cliente
         */
        public string? Direccion_1 { get; set; }

        /**
         * Metodo get y set para manejar el Direccion 2 del Cliente desde Vista Cliente
         */
        public string? Direccion_2 { get; set; }

        /**
         * Metodo get y set para manejar el Telefono 1 del Cliente desde Vista Cliente
         */
        public int? Telefono_1 { get; set; }

        /**
         * Metodo get y set para manejar el Telefono 2 del Cliente desde Vista Cliente
         */
        public int? Telefono_2 { get; set; }

        /**
         * Metodo get y set para manejar el Usuario del Cliente desde Vista Cliente
         */
        public string? Usuario { get; set; }

        /**
         * Metodo get y set para manejar el Password del Cliente desde Vista Cliente
         */
        public string? Password { get; set; }
    }

    /**
     * Clase padre que maneja la estructura de la datos para consultar una factura
     */
    public class Consulta_factura
    {
        /**
         * Metodo constructor de la clase
         */
        public Consulta_factura()
        {
            Cliente = "";
            Numero_de_Factura = null;
        }

        /**
         * Metodo utilizado para poder consultar la factura
         */
        public Consulta_factura(string cliente, double No)
        {
            Cliente = cliente;
            Numero_de_Factura = No;
        }
        /**
         * Metodo get y set para el manejo de datos del cliente
         */
        public string? Cliente { get; set; }
        /**
         * Metodo get y set para el manejo de numero de factura 
         */
        public double? Numero_de_Factura { get; set; }
    }
    
    /**
     * Clase que manipula informacion del login
     */
    public class LoginUser
    {
       /**
        * Constructor
        */
        public LoginUser()
        {
            Usuario = "";
            Contraseña = "";
        }
        /**
         * Metodo  para obtener la info 
         */
        public LoginUser(string? contraseña = null, string usuario = null)
        {
            Usuario = usuario;
            Contraseña = contraseña;
        }
        /**
         * Metodo get y set para manejo del Usuario
         */
        public string Usuario { get; set; }
        /**
         * Metodo get y set para manejo del Constrasena
         */
        public string Contraseña { get; set; }
    }
}