import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../Popup/Popup.component";

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-GClientes',
  templateUrl: './GClientes.component.html',
  styleUrls: ['./GClientes.component.css']

})
/**
 * Clase donde se desarrolla las funcionalidades de la pagina de Cliente en la vista Cliente
 */
export class GClientesComponent {
  token = sessionStorage.getItem("tokenKey");
  respuesta = {};
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.Obtener_Clientes();
  }

  /**
   * Metodo que el cual direcciona a la pagina de clientes al ser solicitada en la barra de menu
   * @constructor metodo relacionado
   */
  async Obtener_Clientes() {
    var res = await this.http.get<string>("https://localhost:7143/GClientes/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo donde se definen las acciones a realizar al clickear el boton de ADD
   * @constructor metodo relacionado
   */
  async Add_Button() {
    const answer = {
      'Nombre_Completo': (<HTMLInputElement>document.getElementById("Nombre_Completo")).value,
      'Cedula': (<HTMLInputElement>document.getElementById("Cedula")).value,
      'Telefono_1': (<HTMLInputElement>document.getElementById("Telefono_1")).value,
      'Telefono_2': (<HTMLInputElement>document.getElementById("Telefono_2")).value,
      'Correo_electronico': (<HTMLInputElement>document.getElementById("Correo_electronico")).value,
      'Direccion_1': (<HTMLInputElement>document.getElementById("Direccion_1")).value,
      'Direccion_2': (<HTMLInputElement>document.getElementById("Direccion_2")).value,
      'Usuario': (<HTMLInputElement>document.getElementById("Usuario")).value,
      'Password': (<HTMLInputElement>document.getElementById("Password")).value
    };
    if (answer.Usuario !== sessionStorage.getItem("Nombre")) {
      Popup.open("ERROR MODIFICANDO LOS DATOS", "No es posible modificar el usuario ni el numero de cedula desde aqui, por favor contacte con MecaTEC", "Cerrar");
      return
    }
    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7143/GClientes/post", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    })
    res.subscribe(result => {
      Popup.open("Datos Modificados", "Se han modificado los datos", "Cerrar");

      this.Obtener_Clientes();
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)

  }

  /**
   * Metodo donde se define la funcion del boton DELETE
   * @constructor
   */
  async Delete_Button() {

  }
}

