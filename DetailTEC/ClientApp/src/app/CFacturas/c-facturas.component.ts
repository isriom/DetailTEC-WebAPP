import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
import {Popup} from "../Popup/Popup.component";

/**
 *  Componentes utilizados para la funcionalidad de la pagina
 */
@Component({
  selector: 'app-CFacturas',
  templateUrl: './c-facturas.component.html',
  styleUrls: ['./c-facturas.component.css']
})

/**
 * Clase que maneja las acciones que se realizan con los elementos de la pagina
 */
export class CFacturasComponent implements OnInit {
  //Variables a utilizar
  respuesta: any | undefined;
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  cliente: any;
  pdf: string;
  factura: any;

  /**
   * Constructor de la clase
   * @param http variable utilizada para utilizar los metodos get y post en la pagina
   * @param baseUrl direccion de la pagina a utilzar
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.Consultar_Factura();
    if (sessionStorage.getItem("Rol") !== "Trabajador") {
      this.cliente = sessionStorage.getItem("Nombre");
    }
    this.pdf = "";
  }

  /**
   * Metodo que muestra la pagina que se esta llamando desde la barra de menu
   * @constructor metodo al que se encuentra relacionado
   */
  async Consultar_Factura() {

    var res = await this.http.get<string>("https://localhost:7143/CFacturas/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(this.respuesta);

  }

  /**
   * Metodo que indica la accion a realizar al presionar el boton de Consultar
   * @constructor metodo al que se encuentra relacionado
   */
  async Consult_Button() {
    this.pdf = ""
    const answer = {
      'Cliente': (<HTMLInputElement>document.getElementById("Cliente")).value,
      'Numero_de_Factura': (<HTMLInputElement>document.getElementById("Numero_de_Factura")).value
    };

    console.log(this.respuesta);
    console.log(answer);
    let res = await this.http.post("https://localhost:7143/CFacturas/post", JSON.stringify(answer), {
      responseType: "blob",
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      },),
      withCredentials: true,
    })
    res.subscribe(result => {

      let blob = new Blob([result], {type: result.type})
      this.pdf = window.URL.createObjectURL(blob);
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => {
      Popup.open("ERROR", "No Se encuentra una factura con este Numero a su nombre", "Recargar", function () {
        window.location.reload();
      })
      console.error(error);
    });
    console.log(res)

  }

  /**
   * Metodo que indica la accion a realizar por el boton de Delete
   * @constructor metodo al que se encuentra relacionado
   */
  async Delete_Button() {
    this.pdf = "favicon.ico"
  }

  /**
   * Metodo de
   */
  ngOnInit(): void {

  }

}
