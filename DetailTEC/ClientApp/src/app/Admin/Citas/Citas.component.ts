import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarCitasComponent} from "./EditarCitas/EditarCitas.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";

/*
Representacion de los datos del Cita
 */
export class citaElement {
  constructor(nombre: string, placa: number, fecha: string, cedula: number, tipo: string, sucursal: string, puntos: boolean) {
    this.nombre = nombre;
    this.placa = placa;
    this.fecha = fecha;
    this.cedula = cedula;
    this.tipo = tipo;
    this.sucursal = sucursal;
    this.puntos = puntos;
  }

  //nombre cliente
  public nombre: string;


  public placa: number;


  public fecha: string;


  public cedula: number;



  //tipo de lavado
  public tipo: string;


  public sucursal: string;

  public puntos: boolean;


  clone() {
    return new citaElement(this.nombre, this.placa, this.fecha, this.cedula, this.tipo, this.sucursal, this.puntos);
  }
  static clone2(cita: citaElement) {
    return new citaElement(cita.nombre, cita.placa, cita.fecha, cita.cedula, cita.tipo, cita.sucursal, cita.puntos);
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
  Citas: citaElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Cita = new FormGroup({});


  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   * @param _modal modal to show edit
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, public _modal: NgbModal
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
    var res = this.http.get<string>("https://localhost:7274/api/Citas/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.Citas = (<citaElement[]><unknown>result);
      console.log(this.Citas[0].puntos);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Cita
   * @constructor metodo relacionado
   */
  async Add() {
    const data = {
      "nombre": (<HTMLInputElement>document.getElementById("ANombre")).value,
      "placa": (<HTMLInputElement>document.getElementById("APlaca")).value,
      "fecha": (<HTMLInputElement>document.getElementById("AFecha")).value,
      "cedula": (<HTMLInputElement>document.getElementById("ACedula")).value,
      "tipo": (<HTMLInputElement>document.getElementById("ATipo")).value,
      "sucursal": (<HTMLInputElement>document.getElementById("ASucursal")).value,
      "puntos": (<HTMLInputElement>document.getElementById("APuntos")).checked,
    };
    console.log(this.respuesta);
    console.log(data);
    let res = await this.http.put("https://localhost:7274/api/Citas/add", JSON.stringify(data), {
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
   * Method to ask the user about the delete of a item
   */
  async Delete_Button(cita: citaElement
  ) {
    Popup.open("Eliminar Cita", "Desea Eliminar este Cita?", "Sí",
      (context: CitasComponent = this) => context.delete_Worker(cita),
      [cita]
    )
  }

  /**
   * methof to call the server and delete the indicate cite
   * @param cita
   */
  async delete_Worker(cita: citaElement) {
    console.log("Cita eliminada: " + (cita.placa) + " " + (cita.fecha) + " " + cita.sucursal)
    let res = await this.http.delete("https://localhost:7274/api/Citas/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: JSON.stringify(cita)
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  async modify_Button(cita: citaElement
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(EditarCitasComponent)
    console.log("Boton clickleado1"+this.actualEditor.componentInstance)
    this.actualEditor.componentInstance.padre = this
    console.log("Boton clickleado2"+this.actualEditor.componentInstance)
    console.log(JSON.stringify(cita))
    this.actualEditor.componentInstance.cita = (citaElement.clone2(cita))
    console.log("Boton clickleado3"+this.actualEditor.componentInstance)
    console.log(this.actualEditor.componentInstance)
    console.log(this.actualEditor)
  }

  clean() {

  }
}
