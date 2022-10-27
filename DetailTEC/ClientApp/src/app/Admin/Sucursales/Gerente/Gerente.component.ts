﻿import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Client class
 */
export class gerenteElement {
  constructor(public nombre: string,
              public cedula: string,
              public fechaInicio: string) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
  }

  static clone(client: gerenteElement) {
    return new gerenteElement(client.nombre,
      client.cedula,
      client.fechaInicio);
  }
}

@Component({
  selector: 'app-Gerente',
  templateUrl: './Gerente.component.html',
  styleUrls: ['./Gerente.component.css']
})


/**
 * Client management class
 */
export class GerentesComponent {

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
    "fechaInicio", "eliminar"]
  Gerentes: gerenteElement[] = [new gerenteElement("isaac", "105040201", "Barrios")];
  actualEditor: NgbModalRef | undefined;
  Gerente = new FormGroup({});


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
    this.get_Gerentes();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Gerentes() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Gerente/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      // this.Gerentes = <gerenteElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Client with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      cedula: (<HTMLInputElement>document.getElementById("ACedula")).value,
      fechaInicio: (<HTMLInputElement>document.getElementById("AFechaInicio")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Gerente/add", JSON.stringify(answer), {
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
  async Delete_Button(Client: gerenteElement
  ) {
    Popup.open("Eliminar Gerente", "Desea Eliminar este Gerente?", "Sí",
      (context: GerentesComponent = this) => () => context.delete_Worker([String(Client.cedula),String(Client.nombre)]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("Gerente eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Gerente/delete", {
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
