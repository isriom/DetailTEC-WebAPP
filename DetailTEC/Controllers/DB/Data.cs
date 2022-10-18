namespace DetailTEC.Controllers.DB;

/**
 * Clase donde se maneja toda la estructura de los datos que se van a almacenar en la base de datos
 */
public class Data
{
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
        public LoginUser(string contraseña = null, string usuario = null)
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