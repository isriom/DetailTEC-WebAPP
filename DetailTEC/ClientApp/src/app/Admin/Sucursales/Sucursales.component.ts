import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarSucursalesComponent} from "./EditarSucursale/EditarSucursales.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del Sucursal
 */
export class sucursalElement {
  constructor(nombre: string, provincia: string, canton: string, distrito: string, telefono: number, fecha_de_apertura: string, gerente: string, fecha_gerente: string) {
    this._nombre = nombre;
    this._provincia = provincia;
    this._canton = canton;
    this._distrito = distrito;
    this._telefono = telefono;
    this._fecha_de_apertura = fecha_de_apertura;
    this._gerente = gerente;
    this._fecha_gerente = fecha_gerente;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _provincia: string;

  get provincia(): string {
    return this._provincia;
  }

  set provincia(value: string) {
    this._provincia = value;
  }

  private _canton: string;

  get canton(): string {
    return this._canton;
  }

  set canton(value: string) {
    this._canton = value;
  }

  private _distrito: string;

  get distrito(): string {
    return this._distrito;
  }

  set distrito(value: string) {
    this._distrito = value;
  }

  private _telefono: number;

  get telefono(): number {
    return this._telefono;
  }

  set telefono(value: number) {
    this._telefono = value;
  }

  private _fecha_de_apertura: string;

  get fecha_de_apertura(): string {
    return this._fecha_de_apertura;
  }

  set fecha_de_apertura(value: string) {
    this._fecha_de_apertura = value;
  }

  private _gerente: string;

  get gerente(): string {
    return this._gerente;
  }

  set gerente(value: string) {
    this._gerente = value;
  }

  private _fecha_gerente: string;

  get fecha_gerente(): string {
    return this._fecha_gerente;
  }

  set fecha_gerente(value: string) {
    this._fecha_gerente = value;
  }


  clone() {
    return new sucursalElement(this.nombre, this.provincia, this.canton, this.distrito, this.telefono, this.fecha_de_apertura, this.gerente, this.fecha_gerente);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Sucursales',
  templateUrl: './Sucursales.component.html',
  styleUrls: ['./Sucursales.component.css']
})


/**
 * Clase donde se desarfecha_gerentela las funcionalidades de la Gestion de los Sucursales en la Vista Taller
 */
export class SucursalesComponent {

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
    "provincia",
    "canton",
    "distrito",
    "telefono",
    "fecha_de_apertura",
    "gerente",
    "fecha_gerente", "eliminar", "modificar"]
  Sucursales: sucursalElement[] = [new sucursalElement(
    "SJ",
    "San Jose",
    "Lindora",
    "servatilla",
    11153,
    new Date().toDateString(),
    "semanal",
    new Date().toDateString(),)
  ];
  actualEditor: NgbModalRef | undefined;
  Sucursal = new FormGroup({});


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
    this.get_Sucursales();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Sucursales() {
    var res = this.http.get<string>("https://localhost:7274/api/Sucursales/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Sucursales = JSON.parse(result);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Sucursal
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      provincia: (<HTMLInputElement>document.getElementById("marca")).value,
      Numero_canton: (<HTMLInputElement>document.getElementById("Numero_canton")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      fecha_de_apertura: (<HTMLInputElement>document.getElementById("fecha_de_apertura")).value,
      gerente: (<HTMLInputElement>document.getElementById("gerente")).value,
      fecha_gerente: (<HTMLInputElement>document.getElementById("fecha_gerente")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7274/api/Sucursales/post", JSON.stringify(answer), {
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
    Popup.open("Eliminar Sucursal", "Desea Eliminar este Sucursal?", "Sí",
      (worker_id: number = id, context: SucursalesComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("Sucursal eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/Sucursales/delete", {
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

  async modify_Button(id: string
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let sucursal of this.Sucursales) {
      if (id === sucursal.nombre) {
        this.actualEditor = this._modal.open(EditarSucursalesComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.sucursal = (sucursal.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
