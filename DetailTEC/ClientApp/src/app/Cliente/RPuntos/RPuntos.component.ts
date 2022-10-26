import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {citaElement} from "../../Admin/Citas/Citas.component";


class RPuntos extends citaElement {
  puntaje: number = 0

  constructor(nombre: string, placa: number, fecha: string, cedula: number, tipo: string, sucursal: string, puntos: boolean, monto: number, iva: number, puntaje: number) {
    super(nombre, placa, fecha, cedula, tipo, sucursal, puntos, monto, iva);
    this.puntaje = puntaje;
  }
}

@Component({
  selector: 'app-RPuntos',
  templateUrl: './RPuntos.component.html',
  styleUrls: ['./RPuntos.component.css']
})


/**
 * Cite management class
 */
export class RPuntosComponent {

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
    "tipo",
    "sucursal",
    "puntos", "puntaje",]
  Puntos: RPuntos[] = [new RPuntos("Isaac", 1, "15/18/2233", 2, "limpieza maxima", "San jose", true, 1500, 150, 45)];
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
    this.get_Puntos();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Puntos() {
    var res = this.http.get<string>("https://localhost:7274/api/client/RPuntos/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.Puntos = (<RPuntos[]><unknown>result);
      console.log(this.Puntos[0].puntos);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  clean() {

  }
}
