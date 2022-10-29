import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarLavadosComponent} from "./EditarLavados/EditarLavados.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {InsumoLavadosComponent} from "./InsumoLavado/InsumoLavado.component";

/*
Representacion de los datos del Sucursal
 */
export class lavadoElement {
  constructor(public nombre: string, public costo: number, public precio: number, public duracion: number, public productos: string, public lavador: boolean, public pulidor: boolean, public puntuacion_coste: number, public puntuacion_ganancia: string) {
    this.nombre = nombre;
    this.costo = costo;
    this.precio = precio;
    this.duracion = duracion;
    this.productos = productos;
    this.lavador = lavador;
    this.pulidor = pulidor;
    this.puntuacion_coste = puntuacion_coste;
    this.puntuacion_ganancia = puntuacion_ganancia;
  }

  static clone(wash: lavadoElement) {
    return new lavadoElement(wash.nombre, wash.costo, wash.precio, wash.duracion, wash.productos, wash.lavador, wash.pulidor, wash.puntuacion_coste, wash.puntuacion_ganancia);
  }
}

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Lavados',
  templateUrl: './Lavados.component.html',
  styleUrls: ['./Lavados.component.css']
})


/**
 * Clase donde se desarfecha_puntuacion_costela las funcionalidades de la Gestion de los Lavados en la Vista Taller
 */
export class LavadosComponent {

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
    "costo",
    "precio",
    "duracion",
    "productos",
    "lavador",
    "pulidor",
    "puntuacion_coste",
    "puntuacion_ganancia", "eliminar", "modificar"]
  Lavados: lavadoElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Sucursal = new FormGroup({});


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
    this.get_Lavados();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  get_Lavados() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Lavados/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Lavados = <lavadoElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para definar la accion que debe realizar el boton para obtener la informacion relacionada al Sucursal
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      costo: (<HTMLInputElement>document.getElementById("ACosto")).value,
      precio: (<HTMLInputElement>document.getElementById("APrecio")).value,
      duracion: (<HTMLInputElement>document.getElementById("ADuracion")).value,
      lavador: (<HTMLInputElement>document.getElementById("ALavador")).checked,
      pulidor: (<HTMLInputElement>document.getElementById("APulidor")).checked,
      puntuacion_coste: (<HTMLInputElement>document.getElementById("APuntuacion_coste")).value,
      puntuacion_ganancia: (<HTMLInputElement>document.getElementById("APuntuacion_ganacia")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Lavados/add", JSON.stringify(answer), {
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
  async Delete_Button(wash: lavadoElement
  ) {
    Popup.open("Eliminar Sucursal", "Desea Eliminar este Sucursal?", "Sí",
      (context: LavadosComponent = this) => () => context.delete_Worker([wash.nombre]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("Sucursal eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Lavados/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: key
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
    for (let lavado of this.Lavados) {
      if (id === lavado.nombre) {
        this.actualEditor = this._modal.open(EditarLavadosComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.lavado = (lavadoElement.clone(lavado))
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }

  Productos(lavado: lavadoElement
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(InsumoLavadosComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.Lavado = lavado
    this.actualEditor.componentInstance.get_InsumoLavados();


  }
}
