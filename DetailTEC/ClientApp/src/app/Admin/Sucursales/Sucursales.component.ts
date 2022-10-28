import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarSucursalesComponent} from "./EditarSucursale/EditarSucursales.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Branch class
 */
export class sucursalElement {
  constructor(public nombre: string, public provincia: string, public canton: string, public distrito: string, public telefono: number, public fecha_de_apertura: string, public gerente: number) {
    this.nombre = nombre;
    this.provincia = provincia;
    this.canton = canton;
    this.distrito = distrito;
    this.telefono = telefono;
    this.fecha_de_apertura = fecha_de_apertura;
    this.gerente = gerente;
  }

  static clone(branch: sucursalElement) {
    return new sucursalElement(branch.nombre, branch.provincia, branch.canton, branch.distrito, branch.telefono, branch.fecha_de_apertura, branch.gerente);
  }
}

@Component({
  selector: 'app-Sucursales',
  templateUrl: './Sucursales.component.html',
  styleUrls: ['./Sucursales.component.css']
})


/**
 * Branch management class
 */
export class SucursalesComponent {

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
    "provincia",
    "canton",
    "distrito",
    "telefono",
    "fecha_de_apertura",
    "gerente", "eliminar", "modificar"]
  Sucursales: sucursalElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Sucursal = new FormGroup({});


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
    this.get_Sucursales();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Sucursales() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Sucursales/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Sucursales = <sucursalElement[]><unknown>result;

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Make a http request to add a new branch
   * @constructor metodo relacionado
   */
  async Add() {
    const answer = {
      nombre: (<HTMLInputElement>document.getElementById("ANombre")).value,
      provincia: (<HTMLInputElement>document.getElementById("AProvincia")).value,
      canton: (<HTMLInputElement>document.getElementById("ACanton")).value,
      distrito: (<HTMLInputElement>document.getElementById("ADistrito")).value,
      telefono: (<HTMLInputElement>document.getElementById("ATelefono")).value,
      fecha_de_apertura: (<HTMLInputElement>document.getElementById("AFecha_de_apertura")).value,
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Sucursales/add", JSON.stringify(answer), {
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
   * Delete Butto method.
   * Ask the confirmation of the delete
   * @constructor metodo relacionado
   */
  async Delete_Button(branch: sucursalElement
  ) {
    Popup.open("Eliminar Sucursal", "Desea Eliminar este Sucursal?", "Sí",
      (context: SucursalesComponent = this) => () => context.delete_Worker([branch.nombre]))
  }

  /**
   * method to make the delete request of a branch in the DB
   * @param keys
   */
  async delete_Worker(keys: string[]
  ) {
    let res = await this.http.delete("https://localhost:7274/api/Admin/Sucursales/delete", {
        headers: this.httpOptions.headers,
        withCredentials: true, body: keys
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log("Sucursal eliminado: " + keys[0])
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Method used to instanciate the modal
   * [Builder], value is storaged in actualEditor
   * @param id
   */
  async modify_Button(id: string
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    for (let sucursal of this.Sucursales) {
      if (id === sucursal.nombre) {
        this.actualEditor = this._modal.open(EditarSucursalesComponent)
        this.actualEditor.componentInstance.padre = this
        this.actualEditor.componentInstance.sucursal = (sucursalElement.clone(sucursal))
        console.log(this.actualEditor.componentInstance)
        console.log(this.actualEditor)
      }
    }
  }

  clean() {

  }

  Gerente(sucursal: sucursalElement) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(EditarSucursalesComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.sucursal = (sucursalElement.clone(sucursal))
    console.log(this.actualEditor.componentInstance)
    console.log(this.actualEditor)

  }


}
