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
  constructor(nombre: string, apellidos: string, cedula: number, fecha_de_ingreso: string, fecha_de_nacimiento: string, edad: number, password: string, rol: string, pago: string) {
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._cedula = cedula;
    this._fecha_de_ingreso = fecha_de_ingreso;
    this._fecha_de_nacimiento = fecha_de_nacimiento;
    this._edad = edad;
    this._password = password;
    this._rol = rol;
    this._pago = pago;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _apellidos: string;

  get apellidos(): string {
    return this._apellidos;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  private _cedula: number;

  get cedula(): number {
    return this._cedula;
  }

  set cedula(value: number) {
    this._cedula = value;
  }

  private _fecha_de_ingreso: string;

  get fecha_de_ingreso(): string {
    return this._fecha_de_ingreso;
  }

  set fecha_de_ingreso(value: string) {
    this._fecha_de_ingreso = value;
  }

  private _fecha_de_nacimiento: string;

  get fecha_de_nacimiento(): string {
    return this._fecha_de_nacimiento;
  }

  set fecha_de_nacimiento(value: string) {
    this._fecha_de_nacimiento = value;
  }

  private _edad: number;

  get edad(): number {
    return this._edad;
  }

  set edad(value: number) {
    this._edad = value;
  }

  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _rol: string;

  get rol(): string {
    return this._rol;
  }

  set rol(value: string) {
    this._rol = value;
  }

  private _pago: string;

  get pago(): string {
    return this._pago;
  }

  set pago(value: string) {
    this._pago = value;
  }

  clone() {
    return new workerElement(this.nombre, this.apellidos, this.cedula, this.fecha_de_ingreso, this.fecha_de_nacimiento, this.edad, this.password, this.rol, this.pago);
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
    "cedula",
    "fecha_de_ingreso",
    "fecha_de_nacimiento",
    "edad",
    "password",
    "rol",
    "pago", "eliminar", "modificar"]
  Workers: workerElement[] = [new workerElement(
    "isriom",
    "barrios",
    1,
    new Date().toDateString(),
    new Date().toDateString(),
    11,
    "contraseña",
    "limpiador", "semanal",)
  ];
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
    var res = this.http.get<string>("https://localhost:7274/api/trabajadores/plantilla", {
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
  async Add() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      Apellidos: (<HTMLInputElement>document.getElementById("AApellidos")).value,
      Numero_Cedula: (<HTMLInputElement>document.getElementById("ACedula")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("AFecha_de_ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("AFecha_Nacimiento")).value,
      Edad: (<HTMLInputElement>document.getElementById("AEdad")).value,
      Password: (<HTMLInputElement>document.getElementById("APassword")).value,
      Rol: (<HTMLInputElement>document.getElementById("ARol")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7274/api/trabajadores/post", JSON.stringify(answer), {
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
  async Delete_Button(id: number
  ) {
    Popup.open("Eliminar trabajador", "Desea Eliminar este trabajador?", "Sí",
      (worker_id: number = id, context: TrabajadoresComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("trabajador eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/trabajadores/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: id
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
        this.actualEditor.componentInstance.worker = worker.clone()
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
