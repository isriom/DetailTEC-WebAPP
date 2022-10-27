import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Client class
 */
export class telefonoElement {
  constructor(public telefono: string,
              public cedula: number) {
    this.cedula = cedula;
    this.telefono = telefono;
  }

  static clone(client: telefonoElement) {
    return new telefonoElement(client.telefono,
      client.cedula);
  }
}

@Component({
  selector: 'app-Telefono',
  templateUrl: './Telefono.component.html',
  styleUrls: ['./Telefono.component.css']
})


/**
 * Client management class
 */
export class TelefonoComponent {

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
    "telefono",
    "cedula", "eliminar"]
  Telefonos: telefonoElement[] = [new telefonoElement("isaac", 105040201)];
  actualEditor: NgbModalRef | undefined;
  Telefono = new FormGroup({});


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
    this.get_Telefono();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Telefono() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Telefono/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      // this.Telefono = <telefonoElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Client with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      telefono: (<HTMLInputElement>document.getElementById("ATelefono")).value,
      cedula: (<HTMLInputElement>document.getElementById("ACedula")).value,
      apellido_1: (<HTMLInputElement>document.getElementById("AApellido_1")).value,
      apellido_2: (<HTMLInputElement>document.getElementById("AApellido_2")).value,
      usuario: (<HTMLInputElement>document.getElementById("AUsuario")).value,
      password: (<HTMLInputElement>document.getElementById("APassword")).value,
      correo: (<HTMLInputElement>document.getElementById("ACorreo")).value,
      puntos: (<HTMLInputElement>document.getElementById("APuntos")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Telefono/add", JSON.stringify(answer), {
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
  async Delete_Button(Client: telefonoElement
  ) {
    Popup.open("Eliminar Telefono", "Desea Eliminar este Telefono?", "Sí",
      (context: TelefonoComponent = this) => () => context.delete_Worker([String(Client.cedula), String(Client.telefono)]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("Telefono eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Telefono/delete", {
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
