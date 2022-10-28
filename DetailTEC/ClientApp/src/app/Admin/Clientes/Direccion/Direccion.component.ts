import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {Popup} from "../../../Popup/Popup.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from "@angular/forms";

/*
Client class
 */
export class direccionElement {
  constructor(public direccion: string,
              public cedula: string) {
    this.cedula = cedula;
    this.direccion = direccion;
  }

  static clone(client: direccionElement) {
    return new direccionElement(client.direccion,
      client.cedula,);
  }
}

@Component({
  selector: 'app-Direccion',
  templateUrl: './Direccion.component.html',
  styleUrls: ['./Direccion.component.css']
})


/**
 * Client management class
 */
export class DireccionesComponent {

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
    "direccion", "eliminar"]
  Direcciones: direccionElement[] = [];
  actualEditor: NgbModalRef | undefined;
  Direccion = new FormGroup({});
  cedula = "";


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
  public get_Direccions() {
    var res = this.http.get<string>("https://localhost:7274/api/Admin/Direccion/list/" + this.cedula, {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      console.log(this.respuesta);
      this.Direcciones = <direccionElement[]><unknown>result;
      console.log(this.Direcciones);
    }, error => console.error(error));
    console.log(this.respuesta);
  }


  /**
   * Button method to make the add request of the Client with the info of the input in the table foote
   */
  async Add() {

    const answer = {
      direccion: (<HTMLInputElement>document.getElementById("ADirecciones")).value,
      cedula: this.cedula
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.put("https://localhost:7274/api/Admin/Direccion/add", JSON.stringify(answer), {
        headers: this.httpOptions.headers,
        withCredentials: true,
      }
    )
    res.subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);
      this.get_Direccions();

    }, error => console.error(error));
    console.log(res)
  }

  /**
   * Delete method called by the delete button, use the branch name as a identification
   */
  async Delete_Button(Client: direccionElement
  ) {
    Popup.open("Eliminar Direccion", "Desea Eliminar este Direccion?", "Sí",
      (context: DireccionesComponent = this) => () => context.delete_Worker([String(Client.cedula), String(Client.direccion)]))
  }

  async delete_Worker(key: string[]
  ) {
    console.log("Direccion eliminado: " + (key[0]))
    let res = await this.http.delete("https://localhost:7274/api/Admin/Direccion/delete", {
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
