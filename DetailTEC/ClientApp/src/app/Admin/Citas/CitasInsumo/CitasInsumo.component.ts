import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {citaElement} from "../Citas.component";

/*
Cita class
 */
export class citasInsumoElement {
  constructor(public placa: string,
              public fecha: string,
              public producto: string,
              public marca: string,
              public cantidad: string,
              public sucursal: string) {
    this.placa = placa;
    this.fecha = fecha;
    this.producto = producto;
    this.marca = marca;
    this.cantidad = cantidad;
    this.sucursal = sucursal;
  }

  static clone(client: citasInsumoElement) {
    return new citasInsumoElement(client.placa, client.fecha, client.producto, client.marca, client.cantidad, client.sucursal);
  }
}

@Component({
  selector: 'app-CitasInsumo',
  templateUrl: './CitasInsumo.component.html',
  styleUrls: ['./CitasInsumo.component.css']
})


/**
 * Cita management class
 */
export class CitasInsumosComponent {

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
    "placa",
    "fecha",
    "producto",
    "marca",
    "cantidad",
    "sucursal",
    "eliminar"]
  CitasInsumos: citasInsumoElement[] = [];
  actualEditor: NgbModalRef | undefined;
  CitasInsumo = new FormGroup({});
  cita: citaElement = new citaElement("", 0, "", "", "", "", true, 0, 0);


  /**
   * Class constructor
   * @param http Http client to make the requests
   * @param baseUrl Actual URL, not in use because the static references
   * @param _modal modal to show edit component, injected
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, private _modal: NgbModal
  ) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_CitasInsumos();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_CitasInsumos() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/CitasInsumos/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      // this.CitasInsumos = <citasInsumoElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Cita with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      placa: (<HTMLInputElement>document.getElementById("APlaca")).value,
      fecha: (<HTMLInputElement>document.getElementById("AFecha")).value,
      producto: (<HTMLInputElement>document.getElementById("AProducto")).value,
      marca: (<HTMLInputElement>document.getElementById("AMarca")).value,
      cantidad: (<HTMLInputElement>document.getElementById("ACantidad")).value,
      sucursal: (<HTMLInputElement>document.getElementById("ASucursal")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/CitasInsumos/add", JSON.stringify(answer), {
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
   * Delete method called by the delete button, use the branch name as a identification
   */
  async Delete_Button(Cita: citasInsumoElement
  ) {
    Popup.open("Eliminar CitasInsumo", "Desea Eliminar este CitasInsumo?", "Sí",
      (context: CitasInsumosComponent = this) => () => context.delete_Worker([String(Cita.placa), String(Cita.fecha), Cita.sucursal, Cita.producto, Cita.marca]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("CitasInsumo eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/CitasInsumos/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
  }


  clean() {

  }
}
