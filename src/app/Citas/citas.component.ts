import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
import {Popup} from "../Popup/Popup.component";

/**
 * Componentes a utilizar para el manejo de la pagina
 */
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

/**
 * Clase donde se desarrollan las acciones de las pagina de citas para la vista Taller
 */
export class CitasComponent implements OnInit {
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

  /**
   * Metodo constructor de la clase
   * @param http variable para poder gestionar el get y post de la pogina
   * @param baseUrl varaiable para almacenar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.Obtener_Cita();
  }

  /**
   * Metodo que crea la pagina en el momento que es solicitada en los componentes de la barra de menu
   * @constructor metodo donde se hace la llamada
   */
  async Obtener_Cita() {
    var res = await this.http.get<string>("https://localhost:7143/Citas/plantilla", {
      headers: this.httpOptions.headers,
      withCredentials: true
    }).subscribe(result => {
      this.respuesta = result;
      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(this.respuesta);
  }

  /**
   * Metodo para la inicializar la pagina
   */
  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router?.navigateByUrl("");
    }
  }

  /**
   * Metodo para definar la accion que debe realizar el boton de Add en la pagina
   * @constructor metodo relacionado
   */
  async Add_Button() {
    const answer = {
      'Cliente': (<HTMLInputElement>document.getElementById("Cliente")).value,
      'Placa_del_Vehiculo': (<HTMLInputElement>document.getElementById("Placa_del_Vehiculo")).value,
      "Sucursal": (<HTMLInputElement>document.getElementById("Sucursal")).value,
      "Servicio_solicitado": (<HTMLInputElement>document.getElementById("Servicio_solicitado")).value
    };
    console.log(this.respuesta);
    console.log(answer);
    const res = this.http.post<string>("https://localhost:7143/Citas/post", JSON.stringify(answer), {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      console.log(answer);

      this.Obtener_Cita();
      Popup.open("CITA REGISTRADA", "Se ha registrado la cita bajo la factura #" + result, "Imprimir");

      console.log(this.respuesta);

    }, error => console.error(error));
    console.log(res)
    console.log(answer);

  }

  /**
   * Metodo para definir la funcionalidad del boton de DELETE
   * @constructor metodo relacionado
   */
  async Delete_Button() {

  }
}
