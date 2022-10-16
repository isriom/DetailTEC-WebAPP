import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarProveedoresComponent} from "./EditarProveedores/EditarProveedores.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Representacion de los datos del proveedor
 */
export class proveedorElement {
  constructor(nombre: string, juridica: string, direccion: string, contacto: number, correo: string) {
    this._nombre = nombre;
    this._juridica = juridica;
    this._direccion = direccion;
    this._contacto = contacto;
    this._correo = correo;
  }

  private _nombre: string;

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  private _juridica: string;

  get juridica(): string {
    return this._juridica;
  }

  set juridica(value: string) {
    this._juridica = value;
  }

  private _direccion: string;

  get direccion(): string {
    return this._direccion;
  }

  set direccion(value: string) {
    this._direccion = value;
  }


  private _contacto: number;

  get contacto(): number {
    return this._contacto;
  }

  set contacto(value: number) {
    this._contacto = value;
  }

  private _correo: string;

  get correo(): string {
    return this._correo;
  }

  set correo(value: string) {
    this._correo = value;
  }


  clone() {
    return new proveedorElement(this.nombre, this.juridica, this.direccion, this.contacto, this.correo);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})


/**
 * Clase donde se desarfecha_gerentela las funcionalidades de la Gestion de los proveedores en la Vista Taller
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
    this.get_proveedores();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
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
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al proveedor
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      Nombre: (<HTMLInputElement>document.getElementById("Nombre")).value,
      juridica: (<HTMLInputElement>document.getElementById("juridica")).value,
      Numero_direccion: (<HTMLInputElement>document.getElementById("Numero_direccion")).value,
      Fecha_Ingreso: (<HTMLInputElement>document.getElementById("Fecha_Ingreso")).value,
      Fecha_Nacimiento: (<HTMLInputElement>document.getElementById("Fecha_Nacimiento")).value,
      correo: (<HTMLInputElement>document.getElementById("correo")).value,
      gerente: (<HTMLInputElement>document.getElementById("gerente")).value,
      fecha_gerente: (<HTMLInputElement>document.getElementById("fecha_gerente")).value
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
   * Metodo para definir la funcionalidad del boton de DELETE
   * @constructor metodo relacionado
   */
  async Delete_Button(id: number
  ) {
    Popup.open("Eliminar proveedor", "Desea Eliminar este proveedor?", "Sí",
      (worker_id: number = id, context: ProveedoresComponent = this) => context.delete_Worker(id), [{id}])
  }

  async delete_Worker(id: number
  ) {
    console.log("proveedor eliminado: " + (<Number>id))
    let res = await this.http.delete("https://localhost:7274/api/proveedores/delete", {
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
    for (let proveedor of this.proveedores) {
      if (id === proveedor.nombre) {
        this.actualEditor = this._modal.open(EditarProveedoresComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.proveedor = (proveedor.clone())
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }
}
