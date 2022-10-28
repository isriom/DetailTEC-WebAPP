import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {insumoElement} from "../Insumos.component";

/*
Client class
 */
export class proveedorProductoElement {
  constructor(public nombre: string,
              public cedula: string,
              public marca: string) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.marca = marca;
  }

  static clone(client: proveedorProductoElement) {
    return new proveedorProductoElement(client.nombre,
      client.cedula, client.marca);
  }
}

@Component({
  selector: 'app-ProveedorProducto',
  templateUrl: './ProveedorProducto.component.html',
  styleUrls: ['./ProveedorProducto.component.css']
})


/**
 * Client management class
 */
export class ProveedorProductosComponent {

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
    "cedula", "marca", "eliminar"]
  ProveedorProductos: proveedorProductoElement[] = [];
  actualEditor: NgbModalRef | undefined;
  ProveedorProducto = new FormGroup({});
  Insumo: insumoElement = new insumoElement("", "", 1, "", 1)


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
  get_ProveedorProductos() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/ProveedorProductos/list/" + this.Insumo.nombre + "/" + this.Insumo.marca, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.ProveedorProductos = <proveedorProductoElement[]><unknown>result;

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
      marca: (<HTMLInputElement>document.getElementById("AMarca")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/ProveedorProductos/add", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_ProveedorProductos();

    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Delete method called by the delete button, use the branch name as a identification
   */
  async Delete_Button(Client: proveedorProductoElement
  ) {
    Popup.open("Eliminar ProveedorProducto", "Desea Eliminar este ProveedorProducto?", "Sí",
      (context: ProveedorProductosComponent = this) => () => context.delete_Worker([String(Client.cedula), String(Client.nombre), String(Client.marca)]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("ProveedorProducto eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/ProveedorProductos/delete", {
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
