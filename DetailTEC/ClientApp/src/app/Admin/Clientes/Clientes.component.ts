import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarClientesComponent} from "./EditarClientes/EditarClientes.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del Cliente
 */
export class clienteElement {
  constructor(nombre: string, cedula: number, apellido_1: string, apellido_2: string, usuario: string, password: string, correo: string, puntos: string) {
    this._cedula = cedula;
    this._nombre = nombre;
    this._apellido_1 = apellido_1;
    this._apellido_2 = apellido_2;
    this._usuario = usuario;
    this._password = password;
    this._correo = correo;
    this._puntos = puntos;
  }

  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _cedula: number;

  get cedula(): number {
    return this._cedula;
  }

  set cedula(value: number) {
    this._cedula = value;
  }

  private _apellido_1: string;

  get apellido_1(): string {
    return this._apellido_1;
  }

  set apellido_1(value: string) {
    this._apellido_1 = value;
  }

  private _apellido_2: string;

  get apellido_2(): string {
    return this._apellido_2;
  }

  set apellido_2(value: string) {
    this._apellido_2 = value;
  }

  private _usuario: string;

  get usuario(): string {
    return this._usuario;
  }

  set usuario(value: string) {
    this._usuario = value;
  }

  private _correo: string;

  get correo(): string {
    return this._correo;
  }

  set correo(value: string) {
    this._correo = value;
  }

  private _puntos: string;

  get puntos(): string {
    return this._puntos;
  }

  set puntos(value: string) {
    this._puntos = value;
  }

  clone() {
    return new clienteElement(this.nombre, this.cedula, this.apellido_1, this.apellido_2, this.usuario, this.password, this.correo, this.puntos);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.css']
})


/**
 * Clase donde se desarfecha_puntosla las funcionalidades de la Gestion de los Clientes en la Vista Taller
 */
export class ClientesComponent {

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
    "cedula",
    "apellido_1",
    "apellido_2",
    "usuario",
    "password",
    "correo",
    "puntos", "eliminar", "modificar"]
  Clientes: clienteElement[] = [
  ];
  actualEditor: NgbModalRef | undefined;
  Cliente = new FormGroup({});


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
    this.get_Clientes();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Clientes() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Clientes/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Clientes = <clienteElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Cliente
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      cedula: (<HTMLInputElement>document.getElementById("marca")).value,
      Numero_apellido_1: (<HTMLInputElement>document.getElementById("Numero_apellido_1")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      _correo: (<HTMLInputElement>document.getElementById("_correo")).value,
      puntos: (<HTMLInputElement>document.getElementById("puntos")).value,
      fecha_puntos: (<HTMLInputElement>document.getElementById("fecha_puntos")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Clientes/add", JSON.stringify(answer), {
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
    Popup.open("Eliminar Cliente", "Desea Eliminar este Cliente?", "Sí",
      (worker_id: number = id, context: ClientesComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("Cliente eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/Clientes/delete", {
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

  async modify_Button(cedula: number
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let cliente of this.Clientes) {
      if (cedula === cliente.cedula) {
        this.actualEditor = this._modal.open(EditarClientesComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.cliente = (cliente.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
