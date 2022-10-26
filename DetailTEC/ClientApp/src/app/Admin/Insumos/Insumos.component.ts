import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarInsumosComponent} from "./EditarInsumos/EditarInsumos.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del insumo
 */
export class insumoElement {
  constructor(public nombre: string, public marca: string, public costo: number, public proveedores: string, public cantidad: number) {
    this.nombre = nombre;
    this.marca = marca;
    this.costo = costo;
    this.proveedores = proveedores;
    this.cantidad = cantidad;
  }


  static clone(insumo: insumoElement) {
    return new insumoElement(insumo.nombre, insumo.marca, insumo.costo, insumo.proveedores, insumo.cantidad);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Insumos',
  templateUrl: './Insumos.component.html',
  styleUrls: ['./Insumos.component.css']
})


/**
 * Clase donde se desarfecha_gerentela las funcionalidades de la Gestion de los Insumos en la Vista Taller
 */
export class InsumoComponent {

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
    "marca",
    "costo",
    "proveedores", "cantidad", "eliminar", "modificar"]
  Insumos: insumoElement[] = [];
  actualEditor: NgbModalRef | undefined;
  insumo = new FormGroup({});


  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   * @param _modal modal to show edit
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, private _modal: NgbModal
  ) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_Insumos();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Insumos() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Insumos/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Insumos = <insumoElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Button method to make the add request of the Product with the info of the input in the table foot
   */
  async Add() {

    const answer = {
      "nombre": (<HTMLInputElement>document.getElementById("ANombre")).value,
      "marca": (<HTMLInputElement>document.getElementById("AMarca")).value,
      "costo": (<HTMLInputElement>document.getElementById("ACosto")).value,
      "proveedores": (<HTMLInputElement>document.getElementById("AProveedores")).value
    };

    console.log(this.respuesta);
    console.log(JSON.stringify(answer));
    let res = await this.http.put("https://localhost:7274/api/Admin/Insumos/add", answer, {
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
  async Delete_Button(product: insumoElement) {
    Popup.open("Eliminar insumo", "Desea Eliminar este insumo?", "Sí",
      (context: InsumoComponent = this) => () =>
        context.delete_Worker([product.nombre, product.marca])
    )
  }

  async delete_Worker(key: string[]
  ) {
    console.log("insumo eliminado: " + key[0])
    let res = await this.http.delete("https://localhost:7274/api/Admin/Insumos/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: JSON.stringify(key)
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  async modify_Button(name: string, brand: string
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let insumo of this.Insumos) {
      if (name === insumo.nombre && brand == insumo.marca) {
        this.actualEditor = this._modal.open(EditarInsumosComponent)
        this.actualEditor.componentInstance.padre = this;
        this.actualEditor.componentInstance.insumo = insumoElement.clone(insumo);
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
