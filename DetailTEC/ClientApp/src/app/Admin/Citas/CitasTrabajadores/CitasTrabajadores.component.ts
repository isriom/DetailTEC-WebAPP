import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {citaElement} from "../Citas.component";

/*
Client class
 */
export class citasTrabajadoresElement {
  constructor(public placa: string,
              public fecha: number,
              public sucursal: string,
              public cedula: string) {
    this.fecha = fecha;
    this.placa = placa;
    this.sucursal = sucursal;
    this.cedula = cedula;
  }

  static clone(client: citasTrabajadoresElement) {
    return new citasTrabajadoresElement(client.placa,
      client.fecha,
      client.sucursal,
      client.cedula);
  }
}

@Component({
  selector: 'app-CitasTrabajadores',
  templateUrl: './CitasTrabajadores.component.html',
  styleUrls: ['./CitasTrabajadores.component.css']
})


/**
 * Client management class
 */
export class CitasTrabajadoresComponent {

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
    "sucursal",
    "cedula", "eliminar"]
  citasTrabajadores: citasTrabajadoresElement[] = [];
  actualEditor: NgbModalRef | undefined;
  CitasTrabajadores = new FormGroup({});
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
    this.get_CitasTrabajadoress();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_CitasTrabajadoress() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/CitasTrabajadores/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      // this.CitasTrabajadoress = <citasTrabajadoresElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Client with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      placa: (<HTMLInputElement>document.getElementById("APlaca")).value,
      fecha: (<HTMLInputElement>document.getElementById("AFecha")).value,
      sucursal: (<HTMLInputElement>document.getElementById("ASucursal")).value,
      cedula: (<HTMLInputElement>document.getElementById("ACedula")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/CitasTrabajadores/add", JSON.stringify(answer), {
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
  async Delete_Button(Client: citasTrabajadoresElement
  ) {
    Popup.open("Eliminar CitasTrabajadores", "Desea Eliminar este CitasTrabajadores?", "Sí",
      (context: CitasTrabajadoresComponent = this) => () => context.delete_Worker([String(Client.cedula), String(Client.placa), String(Client.fecha), Client.sucursal]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("CitasTrabajadores eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/CitasTrabajadoress/delete", {
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
