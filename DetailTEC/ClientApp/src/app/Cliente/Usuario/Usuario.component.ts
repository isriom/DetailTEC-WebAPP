import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {clienteElement} from "../../Admin/Clientes/Clientes.component";
import {EditarClientesComponent} from "../../Admin/Clientes/EditarClientes/EditarClientes.component";


@Component({
  selector: 'app-Usuario',
  templateUrl: './Usuario.component.html',
  styleUrls: ['./Usuario.component.css']
})


/**
 * Client management class
 */
export class UsuarioComponent {

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
    "correo", "direccion", "telefono",
    "puntos", "modificar"]
  Usuario: clienteElement[] = [];
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
    this.get_Usuario();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Usuario() {
    var res = this.http.get<string>("https://localhost:7274/api/Cliente/Usuario/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Usuario = <clienteElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  async modify_Button(cedula: number
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let cliente of this.Usuario) {
      if (cedula === cliente.cedula) {
        this.actualEditor = this._modal.open(EditarClientesComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.cliente = (clienteElement.clone(cliente))
        this.actualEditor.componentInstance.dir = "Cliente"
      }
    }
  }

  clean() {

  }
}
