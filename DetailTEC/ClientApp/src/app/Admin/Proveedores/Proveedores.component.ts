import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarProveedoresComponent} from "./EditarProveedores/EditarProveedores.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Provider class
 */
export class proveedorElement {
  constructor(public nombre: string, public juridica: string, public direccion: string, public contacto: number, public correo: string) {
    this.nombre = nombre;
    this.juridica = juridica;
    this.direccion = direccion;
    this.contacto = contacto;
    this.correo = correo;
  }

  static clone(provider: proveedorElement) {
    return new proveedorElement(provider.nombre, provider.juridica, provider.direccion, provider.contacto, provider.correo);
  }
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})


/**
 * Provider management class
 */
export class ProveedoresComponent {

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
    "juridica",
    "direccion",
    "contacto",
    "correo", "eliminar", "modificar"]
  proveedores: proveedorElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Proveedor = new FormGroup({});


  /**
   * Class constructor
   * @param http Http client to make the requests
   * @param baseUrl Actual URL, not in use because the static references
   * @param _modal modal to show edit component, injected
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _modal: NgbModal) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_proveedores();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_proveedores() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Proveedores/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.proveedores = <proveedorElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Button method to make the add request of the Provider with the info of the input in the table foote
   */
  async Add() {
    const answer = {
      nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      juridica: (<HTMLInputElement>document.getElementById("AJuridica")).value,
      direccion: (<HTMLInputElement>document.getElementById("ADireccion")).value,
      contacto: (<HTMLInputElement>document.getElementById("Acontacto")).value,
      correo: (<HTMLInputElement>document.getElementById("ACorreo")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Proveedores/add", JSON.stringify(answer), {
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
  async Delete_Button(provider: proveedorElement) {
    Popup.open("Eliminar proveedor", "Desea Eliminar este proveedor?", "Sí",
      (context: ProveedoresComponent = this) => () => context.delete_Worker([provider.juridica]))
  }

  /**
   * methof to call the server and delete the indicate cite
   * @param cita
   */
  async delete_Worker(keys: string[]) {
    console.log("proveedor eliminado: " + (keys[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Proveedores/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: keys
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  async modify_Button(id: string) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let proveedor of this.proveedores) {
      if (id === proveedor.nombre) {
        this.actualEditor = this._modal.open(EditarProveedoresComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.proveedor = (proveedorElement.clone(proveedor))
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
