import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {lavadoElement} from "../Lavados.component";

/*
Client class
 */
export class insumoLavadoElement {
  constructor(public nombreIP: string,
              public tipo: string,
              public marca: string) {
    this.tipo = tipo;
    this.nombreIP = nombreIP;
    this.marca = marca;
  }

  static clone(client: insumoLavadoElement) {
    return new insumoLavadoElement(client.nombreIP,
      client.tipo,
      client.marca,);
  }
}

@Component({
  selector: 'app-InsumoLavado',
  templateUrl: './InsumoLavado.component.html',
  styleUrls: ['./InsumoLavado.component.css']
})


/**
 * Client management class
 */
export class InsumoLavadosComponent {

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
  displayedColumns: string[] = ["nombre",
    "marca", "eliminar"]
  InsumoLavados: insumoLavadoElement[] = [];
  actualEditor: NgbModalRef | undefined;
  InsumoLavado = new FormGroup({});
  Lavado: lavadoElement = new lavadoElement("a", 1, 1, 15, "1", true, true, 15, "11");


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
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_InsumoLavados() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/InsumoLavado/list/"+this.Lavado.nombre, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.InsumoLavados = <insumoLavadoElement[]><unknown>result;
      console.log(this.InsumoLavados);
    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Client with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      nombreIP: (<HTMLInputElement>document.getElementById("ANombreIP")).value,
      tipo: this.Lavado.nombre,
      marca: (<HTMLInputElement>document.getElementById("AMarca")).value
    };

    console.log(this.respuesta);
    console.log((<HTMLInputElement>document.getElementById("ANombre")).value);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/InsumoLavado/add", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_InsumoLavados();

    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Delete method called by the delete button, use the branch name as a identification
   */
  async Delete_Button(Client: insumoLavadoElement
  ) {
    Popup.open("Eliminar InsumoLavado", "Desea Eliminar este InsumoLavado?", "Sí",
      (context: InsumoLavadosComponent = this) => () => context.delete_Worker([String(Client.tipo), Client.nombreIP, Client.marca]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("InsumoLavado eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/InsumoLavado/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_InsumoLavados();

    }, error => console.error(error));
  }

  clean() {

  }
}
