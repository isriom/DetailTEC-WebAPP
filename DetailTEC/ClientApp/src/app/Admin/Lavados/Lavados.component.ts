import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarLavadosComponent} from "./EditarLavados/EditarLavados.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del Sucursal
 */
export class lavadoElement {
  constructor(nombre: string, costo: number, precio: number, duracion: number, productos: string, lavador: boolean, pulidor: boolean, puntuacion_coste: number, puntuacion_ganancia: string) {
    this._nombre = nombre;
    this._costo = costo;
    this._precio = precio;
    this._duracion = duracion;
    this._productos = productos;
    this._lavador = lavador;
    this._pulidor = pulidor;
    this._puntuacion_coste = puntuacion_coste;
    this._puntuacion_ganancia = puntuacion_ganancia;
  }

  private _lavador: boolean;

  get lavador(): boolean {
    return this._lavador;
  }

  set lavador(value: boolean) {
    this._lavador = value;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _costo: number;

  get costo(): number {
    return this._costo;
  }

  set costo(value: number) {
    this._costo = value;
  }

  private _precio: number;

  get precio(): number {
    return this._precio;
  }

  set precio(value: number) {
    this._precio = value;
  }

  private _duracion: number;

  get duracion(): number {
    return this._duracion;
  }

  set duracion(value: number) {
    this._duracion = value;
  }

  private _productos: string;

  get productos(): string {
    return this._productos;
  }

  set productos(value: string) {
    this._productos = value;
  }

  private _pulidor: boolean;

  get pulidor(): boolean {
    return this._pulidor;
  }

  set pulidor(value: boolean) {
    this._pulidor = value;
  }

  private _puntuacion_coste: number;

  get puntuacion_coste(): number {
    return this._puntuacion_coste;
  }

  set puntuacion_coste(value: number) {
    this._puntuacion_coste = value;
  }

  private _puntuacion_ganancia: string;

  get puntuacion_ganancia(): string {
    return this._puntuacion_ganancia;
  }

  set puntuacion_ganancia(value: string) {
    this._puntuacion_ganancia = value;
  }


  clone() {
    return new lavadoElement(this.nombre, this.costo, this.precio, this.duracion, this.productos, this.lavador, this.pulidor, this.puntuacion_coste, this.puntuacion_ganancia);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Lavados',
  templateUrl: './Lavados.component.html',
  styleUrls: ['./Lavados.component.css']
})


/**
 * Clase donde se desarfecha_puntuacion_costela las funcionalidades de la Gestion de los Lavados en la Vista Taller
 */
export class LavadosComponent {

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
    "costo",
    "precio",
    "duracion",
    "productos",
    "lavador",
    "pulidor",
    "puntuacion_coste",
    "puntuacion_ganancia", "eliminar", "modificar"]
  Lavados: lavadoElement[] = [];
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
    this.get_Lavados();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Lavados() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Lavados/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Lavados = <lavadoElement[]><unknown>result;

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
      costo: (<HTMLInputElement>document.getElementById("marca")).value,
      Numero_precio: (<HTMLInputElement>document.getElementById("Numero_precio")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      _pulidor: (<HTMLInputElement>document.getElementById("_pulidor")).value,
      puntuacion_coste: (<HTMLInputElement>document.getElementById("puntuacion_coste")).value,
      fecha_puntuacion_coste: (<HTMLInputElement>document.getElementById("fecha_puntuacion_coste")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Lavados/add", JSON.stringify(answer), {
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
      (worker_id: number = id, context: LavadosComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("Sucursal eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Lavados/delete", {
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
    for (let lavado of this.Lavados) {
      if (id === lavado.nombre) {
        this.actualEditor = this._modal.open(EditarLavadosComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.lavado = (lavado.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
