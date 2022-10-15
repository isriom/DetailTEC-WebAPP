import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../Popup/Popup.component";
import {EditarCitasComponent} from "./EditarCitas/EditarCitas.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del Sucursal
 */
export class citaElement {
  constructor(nombre: string, placa: string, fecha: string, cedula: string, tipo: number, sucursal: string, puntos: string) {
    this._nombre = nombre;
    this._placa = placa;
    this._fecha = fecha;
    this._cedula = cedula;
    this._tipo = tipo;
    this._sucursal = sucursal;
    this._puntos = puntos;
  }

  //nombre cliente
  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _placa: string;

  get placa(): string {
    return this._placa;
  }

  set placa(value: string) {
    this._placa = value;
  }

  private _fecha: string;

  get fecha(): string {
    return this._fecha;
  }

  set fecha(value: string) {
    this._fecha = value;
  }

  private _cedula: string;

  get cedula(): string {
    return this._cedula;
  }

  set cedula(value: string) {
    this._cedula = value;
  }

  //tipo de lavado
  private _tipo: number;

  get tipo(): number {
    return this._tipo;
  }

  set tipo(value: number) {
    this._tipo = value;
  }

  private _sucursal: string;

  get sucursal(): string {
    return this._sucursal;
  }

  set sucursal(value: string) {
    this._sucursal = value;
  }

  private _puntos: string;

  get puntos(): string {
    return this._puntos;
  }

  set puntos(value: string) {
    this._puntos = value;
  }

  clone() {
    return new citaElement(this.nombre, this.placa, this.fecha, this.cedula, this.tipo, this.sucursal, this.puntos);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Citas',
  templateUrl: './Citas.component.html',
  styleUrls: ['./Citas.component.css']
})


/**
 * Clase donde se desarfecha_puntosla las funcionalidades de la Gestion de los Citas en la Vista Taller
 */
export class CitasComponent {

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
    "placa",
    "fecha",
    "cedula",
    "tipo",
    "sucursal",
    "puntos", "eliminar", "modificar"]
  Citas: citaElement[] = [new citaElement(
    "SJ",
    "San Jose",
    "Lindora",
    "servatilla",
    11153,
    new Date().toDateString(),
    "semanal",)
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
    this.get_Citas();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Citas() {
    var res = this.http.get<string>("https://localhost:7274/api/Citas/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Citas = JSON.parse(result);

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
      placa: (<HTMLInputElement>document.getElementById("marca")).value,
      Numero_fecha: (<HTMLInputElement>document.getElementById("Numero_fecha")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      sucursal: (<HTMLInputElement>document.getElementById("sucursal")).value,
      puntos: (<HTMLInputElement>document.getElementById("puntos")).value,
      fecha_puntos: (<HTMLInputElement>document.getElementById("fecha_puntos")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7274/api/Citas/post", JSON.stringify(answer), {
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
      (worker_id: number = id, context: CitasComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("Sucursal eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/Citas/delete", {
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

  async modify_Button(fecha: String
    , sucursal: String, placa: String) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let cita of this.Citas) {
      if (fecha === cita.fecha&&sucursal === cita.sucursal&&placa === cita.placa) {
        this.actualEditor = this._modal.open(EditarCitasComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.cita = (cita.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
