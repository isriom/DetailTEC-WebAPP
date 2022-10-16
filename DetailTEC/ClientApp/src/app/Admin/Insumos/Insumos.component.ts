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
  constructor(nombre: string, marca: string, costo: number, proveedores: string) {
    this._nombre = nombre;
    this._marca = marca;
    this._costo = costo;
    this._proveedores = proveedores;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _marca: string;

  get marca(): string {
    return this._marca;
  }

  set marca(value: string) {
    this._marca = value;
  }

  private _costo: number;

  get costo(): number {
    return this._costo;
  }

  set costo(value: number) {
    this._costo = value;
  }

  private _proveedores: string;

  get proveedores(): string {
    return this._proveedores;
  }

  set proveedores(value: string) {
    this._proveedores = value;
  }


  clone() {
    return new insumoElement(this.nombre, this.marca, this.costo, this.proveedores);
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
    "proveedores", "eliminar", "modificar"]
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
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
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
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al insumo
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      marca: (<HTMLInputElement>document.getElementById("marca")).value,
      Numero_canton: (<HTMLInputElement>document.getElementById("Numero_canton")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Insumos/add", JSON.stringify(answer), {
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
   * Metodo para definir la funcionalidad del boton de DELETE
   * @constructor metodo relacionado
   */
  async Delete_Button(id: string
  ) {
    Popup.open("Eliminar insumo", "Desea Eliminar este insumo?", "Sí",
      (worker_id: string = id, context: InsumoComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: string
  ) {
    console.log("insumo eliminado: " + (<string>id))
    let res = await this.http.delete("https://localhost:7274/api/Insumos/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: id
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  async modify_Button(id: string
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let insumo of this.Insumos) {
      if (id === insumo.nombre) {
        this.actualEditor = this._modal.open(EditarInsumosComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.insumo = (insumo.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
