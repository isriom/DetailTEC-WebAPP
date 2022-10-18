import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarClientesComponent} from "./EditarClientes/EditarClientes.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Client class
 */
export class clienteElement {
  constructor(public nombre: string,
              public cedula: number,
              public apellido_1: string,
              public apellido_2: string,
              public usuario: string,
              public password: string,
              public correo: string,
              public puntos: string) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.apellido_1 = apellido_1;
    this.apellido_2 = apellido_2;
    this.usuario = usuario;
    this.password = password;
    this.correo = correo;
    this.puntos = puntos;
  }

  static clone(client: clienteElement) {
    return new clienteElement(client.nombre,
      client.cedula,
      client.apellido_1,
      client.apellido_2,
      client.usuario,
      client.password,
      client.correo,
      client.puntos);
  }
}

@Component({
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.css']
})


/**
 * Client management class
 */
export class ClientesComponent {

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
    "apellido_1",
    "apellido_2",
    "usuario",
    "password",
    "correo",
    "puntos","direccion","telefono", "eliminar", "modificar"]
  Clientes: clienteElement[] = [new clienteElement("isaac",105040201,"Barrios", "Campos","Isriom","asdasdasd","2001","500")];
  actualEditor: NgbModalRef | undefined;
  Cliente = new FormGroup({});


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
    this.get_Clientes();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Clientes() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Clientes/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      // this.Clientes = <clienteElement[]><unknown>result;

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
      apellido_1: (<HTMLInputElement>document.getElementById("AApellido_1")).value,
      apellido_2: (<HTMLInputElement>document.getElementById("AApellido_2")).value,
      usuario: (<HTMLInputElement>document.getElementById("AUsuario")).value,
      password: (<HTMLInputElement>document.getElementById("APassword")).value,
      correo: (<HTMLInputElement>document.getElementById("ACorreo")).value,
      puntos: (<HTMLInputElement>document.getElementById("APuntos")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Clientes/add", JSON.stringify(answer), {
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
  async Delete_Button(Client: clienteElement
  ) {
    Popup.open("Eliminar Cliente", "Desea Eliminar este Cliente?", "Sí",
      (context: ClientesComponent = this) => () => context.delete_Worker([String(Client.cedula)]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("Cliente eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Clientes/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
  }

  async modify_Button(cedula: number
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let cliente of this.Clientes) {
      if (cedula === cliente.cedula) {
        this.actualEditor = this._modal.open(EditarClientesComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.cliente = (clienteElement.clone(cliente))
      }
    }
  }

  clean() {

  }
}
