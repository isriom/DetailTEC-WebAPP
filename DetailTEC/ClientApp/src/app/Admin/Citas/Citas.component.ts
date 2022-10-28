import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarCitasComponent} from "./EditarCitas/EditarCitas.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {CitasInsumosComponent} from "./CitasInsumo/CitasInsumo.component";
import {CitasTrabajadoresComponent} from "./CitasTrabajadores/CitasTrabajadores.component";

/*
cite class
 */
export class citaElement {
  constructor(public nombre: string, public placa: number, public fecha: string, public cedula: string, public tipo: string, public sucursal: string, public puntos: boolean, public monto: number, public iva: number) {
    this.nombre = nombre;
    this.placa = placa;
    this.fecha = fecha;
    this.cedula = cedula;
    this.tipo = tipo;
    this.sucursal = sucursal;
    this.puntos = puntos;
    this.iva = iva;
    this.monto = monto;
  }

  static clone2(cita: citaElement) {
    return new citaElement(cita.nombre, cita.placa, cita.fecha, cita.cedula, cita.tipo, cita.sucursal, cita.puntos, cita.monto, cita.iva);
  }

  clone() {
    return new citaElement(this.nombre, this.placa, this.fecha, this.cedula, this.tipo, this.sucursal, this.puntos, this.monto, this.iva);
  }
}


@Component({
  selector: 'app-Citas',
  templateUrl: './Citas.component.html',
  styleUrls: ['./Citas.component.css']
})


/**
 * Cite management class
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
    "sucursal", "monto", "iva",
    "puntos", "trabajador", "productos", "eliminar", "modificar"]
  Citas: citaElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Cita = new FormGroup({});


  /**
   * Class constructor
   * @param http Http client to make the requests
   * @param baseUrl Actual URL, not in use because the static references
   * @param _modal modal to show edit component, injected
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, public _modal: NgbModal
  ) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_Citas();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Citas() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Citas/list", {
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
   * Button method to make the add request of the Provider with the info of the input in the table foote
   */
  async Add() {
    const data = {
      "placa": (<HTMLInputElement>document.getElementById("APlaca")).value,
      "fecha": (<HTMLInputElement>document.getElementById("AFecha")).value,
      "cedula": (<HTMLInputElement>document.getElementById("ACedula")).value,
      "tipo": (<HTMLInputElement>document.getElementById("ATipo")).value,
      "sucursal": (<HTMLInputElement>document.getElementById("ASucursal")).value,
      "puntos": (<HTMLInputElement>document.getElementById("APuntos")).checked,
    };
    console.log(this.respuesta);
    console.log(data);
    let res = await this.http.put("https://localhost:7274/api/Admin/Citas/add", JSON.stringify(data), {
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
   * Method to ask the user about the deletion of a item
   */
  async Delete_Button(cita: citaElement
  ) {
    Popup.open("Eliminar Cita", "Desea Eliminar este Cita?", "Sí",
      (context: CitasComponent = this) => () => context.delete_Worker([String(cita.placa),cita.fecha, cita.sucursal])
    )
  }

  /**
   * methof to call the server and delete the indicate cite
   * @param key
   */
  async delete_Worker(key: string[]) {
    console.log("Cita eliminada: " + key)
    let res = await this.http.delete("https://localhost:7274/api/Admin/Citas/delete", {
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

  async modify_Button(cita: citaElement
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(EditarCitasComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.cita = (citaElement.clone2(cita))
  }

  clean() {

  }

  Productos(cita:citaElement) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(CitasInsumosComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.cita = (citaElement.clone2(cita))
  }

  Trabajador(cita: citaElement) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(CitasTrabajadoresComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.cita = (citaElement.clone2(cita))
  }
}
