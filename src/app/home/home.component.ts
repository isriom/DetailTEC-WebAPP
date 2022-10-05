import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Popup} from "../Popup/Popup.component";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

/**
 * Clase donde se desarrolla lo relacionada a la pantalla inicial de la pagina
 */
export class HomeComponent implements OnInit {
  //Variables a utilizar
  token = sessionStorage.getItem("Token");
  user = sessionStorage.getItem("Nombre")
  headers = {};
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
  login = new FormGroup({
      user: new FormControl(),
      pass: new FormControl(),
    }
  );

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   * @param snackBar
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public snackBar: MatSnackBar) {
    this.http = http;
    this.baseurl = baseUrl;
    if (this.token === undefined) {
      this.token = "null";
    }
    console.log(this.token)
    console.log(this.user)
  }

  /**
   * Metodo donde se define la accion de atraer los datos para realizar las verificaciones correspondientes e iniciar sesion
   * @constructor metodo relacionado
   */
  async Sig_In() {

    const answer = {
      'Usuario': this.login.controls.user.value,
      'Contraseña': this.login.controls.pass.value,
    };
    console.log(answer);
    const res = this.http.put<string>("https://localhost:7274/login/Signin", answer, {
      headers: this.httpOptions.headers,
      withCredentials: true,
    });
    res.subscribe(result => {
      console.log(answer);

      this.respuesta = result;
      sessionStorage.setItem("Nombre", <string>answer.Usuario);
      sessionStorage.setItem("Token", "True");
      this.user = answer.Usuario
      sessionStorage.setItem("Rol", result)
      window.location.reload()
      console.log(this.respuesta);

    }, error => {
      Popup.open("ERROR IN LOGIN", "EL USUARIO Y/O LA CONTRASEÑA NO COINCIDEN", "RECARGAR", function () {
        window.location.reload();
      })
      console.error(error)
    });
  }

  /**
   * Metodo donde se desarrolla la accion de cerrar sesion en la pagina
   */
  async logout() {

    let res = await this.http.put("https://localhost:7274/logout", JSON.stringify({}), {
      headers: this.httpOptions.headers,
      withCredentials: true,
      observe: "response"
    })
    res.subscribe(result => {
      this.snackBar.open("Log out sucefully", "close");
      console.log(result);
      sessionStorage.clear();
      // window.location.reload()
    }, error => console.error(error));
  }

  ngOnInit() {

  }
}
