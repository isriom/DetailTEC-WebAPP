import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarTrabajadorComponent} from "./EditarTrabajador/EditarTrabajador.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del trabajador
 */
export class workerElement {
  constructor(public nombre: string, public apellidos: string, public apellidos2: string, public cedula: number, public fecha_de_ingreso: string, public fecha_de_nacimiento: string, public edad: Number, public password: string, public rol: string, public pago: string) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.apellidos2 = apellidos2;
    this.cedula = cedula;
    this.fecha_de_ingreso = fecha_de_ingreso;
    this.fecha_de_nacimiento = fecha_de_nacimiento;
    this.edad = edad;
    this.password = password;
    this.rol = rol;
    this.pago = pago;
  }

  static clone(worker: workerElement) {
    return new workerElement(worker.nombre, worker.apellidos, worker.apellidos2, worker.cedula, worker.fecha_de_ingreso, worker.fecha_de_nacimiento, worker.edad, worker.password, worker.rol, worker.pago);
  }
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
export class TrabajadoresComponent {

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
    "apellidos2",
    "cedula",
    "fecha_de_ingreso",
    "fecha_de_nacimiento",
    "edad",
    "password",
    "rol",
    "pago", "eliminar", "modificar"]
  Workers: workerElement[] = [];
  actualEditor: NgbModalRef | undefined;
  trabajador = new FormGroup({});


  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   * @param _modal modal to show edit
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, private _modal: NgbModal
  ) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_Workers();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Workers() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Trabajadores/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Workers = <workerElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Trabajador
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      apellidos: (<HTMLInputElement>document.getElementById("AApellidos")).value,
      apellidos2: (<HTMLInputElement>document.getElementById("AApellidos2")).value,
      cedula: (<HTMLInputElement>document.getElementById("ACedula")).value,
      fecha_de_ingreso: (<HTMLInputElement>document.getElementById("AFecha_de_ingreso")).value,
      fecha_de_nacimiento: (<HTMLInputElement>document.getElementById("AFecha_de_nacimiento")).value,
      edad: (<HTMLInputElement>document.getElementById("AEdad")).value,
      password: (<HTMLInputElement>document.getElementById("APassword")).value,
      rol: (<HTMLInputElement>document.getElementById("ARol")).value,
      pago: (<HTMLInputElement>document.getElementById("APago")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Trabajadores/add", JSON.stringify(answer), {
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
  async Delete_Button(worker: workerElement) {
    Popup.open("Eliminar trabajador", "Desea Eliminar este trabajador?", "Sí",
      (context: TrabajadoresComponent = this) => () => context.delete_Worker([String(worker.cedula)]))
  }

  async delete_Worker(key: string[]) {
    console.log("trabajador eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Trabajadores/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  async modify_Button(id: number
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let worker of this.Workers) {
      if (id === worker.cedula) {
        this.actualEditor = this._modal.open(EditarTrabajadorComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.worker = workerElement.clone(worker)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
