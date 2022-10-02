import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
/**
 * Clase donde se desarrolla las funcionalidades de la Gestion de los Trabajadores en la Vista Taller
 */
export class trabajadoresComponent {
  //Variables utilizadas
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
  elseBlock: any;

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.Obtener_trabajadores();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  async Obtener_trabajadores() {
    var res = await this.http.get<string>("https://localhost:7143/trabajadores/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Trabajador
   * @constructor metodo relacionado
   */
  async Add_Button() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      Apellidos: (<HTMLInputElement>document.getElementById("Apellidos")).value,
      Numero_Cedula: (<HTMLInputElement>document.getElementById("Numero_Cedula")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      Edad: (<HTMLInputElement>document.getElementById("Edad")).value,
      Password: (<HTMLInputElement>document.getElementById("Password")).value,
      Rol: (<HTMLInputElement>document.getElementById("Rol")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7143/trabajadores/post", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Metodo para definir la funcionalidad del boton de DELETE
   * @constructor metodo relacionado
   */
  async Delete_Button() {

  }
}

