import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../Popup/Popup.component";
import {EditarRCitasComponent} from "./EditarRCitas/EditarRCitas.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";
import {citaElement} from "../../Admin/Citas/Citas.component";


@Component({
  selector: 'app-RCitas',
  templateUrl: './RCitas.component.html',
  styleUrls: ['./RCitas.component.css']
})


/**
 * Cite management class
 */
export class RCitasComponent {

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
    "placa",
    "fecha",
    "tipo",
    "sucursal",
    "puntos", "eliminar", "modificar"]
  Citas: citaElement[] = [new citaElement("Isaac", 1, "15/18/2233", 2, "limpieza maxima", "San jose", true)];
  actualEditor: NgbModalRef | undefined;
  Cita = new FormGroup({});
  public kinds: string[] = ["Prueba", "Prueba2"];
  public branchs: string[] = ["SJ", "Cartago"];


  /**
   * Class constructor
   * @param http Http client to make the requests
   * @param baseUrl Actual URL, not in use because the static references
   * @param _modal modal to show edit component, injected
   */
  constructor(http: HttpClient, @Inject('BASE_URL')
    baseUrl: string, public _modal: NgbModal
  ) {
    this.http = http;
    this.baseurl = baseUrl;
    this.get_Citas();
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  get_Citas() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Citas/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.Citas = (<citaElement[]><unknown>result);
      console.log(this.Citas[0].puntos);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Button method to make the add request of the Provider with the info of the input in the table foote
   */
  async Add() {
    const data = {
      "placa": (<HTMLInputElement>document.getElementById("APlaca")).value,
      "fecha": (<HTMLInputElement>document.getElementById("AFecha")).value,
      "tipo": (<HTMLInputElement>document.getElementById("ATipo")).value,
      "sucursal": (<HTMLInputElement>document.getElementById("ASucursal")).value,
      "puntos": (<HTMLInputElement>document.getElementById("APuntos")).checked,
    };
    console.log(this.respuesta);
    console.log(data);
    let res = await this.http.put("https://localhost:7274/api/Admin/Citas/add", JSON.stringify(data), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
  }

  /**
   * Method to ask the user about the deletion of a item
   */
  async Delete_Button(cita: citaElement
  ) {
    Popup.open("Eliminar Cita", "Desea Eliminar este Cita?", "Sí",
      (context: RCitasComponent = this) => () => context.delete_Worker([cita.fecha, String(cita.placa), cita.sucursal])
    )
  }

  /**
   * methof to call the server and delete the indicate cite
   * @param key
   */
  async delete_Worker(key: string[]) {
    console.log("Cita eliminada: " + key)
    let res = await this.http.delete("https://localhost:7274/api/Admin/Citas/delete", {
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

  async modify_Button(cita: citaElement
  ) {
    if (this.actualEditor != undefined) {
      this.actualEditor.close()
    }
    this.actualEditor = this._modal.open(EditarRCitasComponent)
    this.actualEditor.componentInstance.padre = this
    this.actualEditor.componentInstance.cita = (citaElement.clone2(cita))
  }

  clean() {

  }
}
