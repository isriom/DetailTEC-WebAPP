import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Popup} from "../Popup/Popup.component";

/*
Representacion de los datos del trabajador
 */
export interface workerElement {
  "nombre": string;
  apellidos: string;
  cedula: number;
  fecha_de_ingreso: string;
  fecha_de_nacimiento: string;
  edad: number;
  password: string;
  rol: string;
  pago: string;
}

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
  displayedColumns: string[] = [
    "nombre",
    "apellidos",
    "cedula",
    "fecha_de_ingreso",
    "fecha_de_nacimiento",
    "edad",
    "password",
    "rol",
    "pago", "eliminar", "modificar"]
  Workers: workerElement[] = [{
    nombre: "isriom",
    apellidos: "barrios",
    cedula: 1,
    fecha_de_ingreso: new Date().toDateString(),
    fecha_de_nacimiento: new Date().toDateString(),
    edad: 11,
    password: "contraseña",
    pago: "semanal",
    rol: "limpiador"
  }];

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_Workers();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Workers() {
    var res = this.http.get<string>("https://localhost:7143/trabajadores/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Workers = JSON.parse(result);

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
  async Delete_Button(id: number) {
    Popup.open("Eliminar trabajador","Desea Eliminar este trabajador?","Sí", this.delete_Worker,[{id}])
  }
  async delete_Worker(id:number ){
    console.log("trabajador eliminado: "+(<Number>id))
  }

  async modify_Button(id: number) {

    let res = await this.http.post("https://localhost:7143/trabajadores/post", JSON.stringify(id), {
        headers: this.httpOptions.headers.set("Content-Type", "application/id"),
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }
}
