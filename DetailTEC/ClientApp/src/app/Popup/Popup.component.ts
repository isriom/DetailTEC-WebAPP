import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';

/**
 * Componentes utilizados para el funcionamiento de la pagina
 */
@Component({
  selector: 'app-Popup',
  templateUrl: './Popup.component.html',
  styleUrls: ['./Popup.component.css']
})

/**
 * Clase donde se desarrolla las funcionalidades de la ventana de aviso al crear una factura
 */
export class Popup implements OnInit {

  static pop: Popup;
  http: HttpClient;
  router: Router | undefined;
  baseurl: string;
  div = document.getElementById("popup");
  Title: any = "Titulo";
  Text: string = "TEXTO";
  actionText: string = "ACTION";

  /**
   * Constructor de la clase
   * @param http variable para la manipulacion del get y post
   * @param baseUrl variable para manejar la direccion de la pagina
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseurl = baseUrl;
    this.setactionF(this.close);
    this.div = document.getElementById("popup");
    Popup.pop = this;
    this.close()
  }

  /**
   *Metodo para abrir la ventana de aviso con los datos correctos
   * @param TITLE
   * @param TEXT
   * @param ACTIONTEXT
   * @param FUNC
   * @param params
   */

  static open(TITLE: string, TEXT: string, ACTIONTEXT: string, FUNC?: Function,params?:object[]) {
    Popup.pop.setactionF(FUNC,params);
    Popup.pop.Title = TITLE;
    Popup.pop.Text = TEXT;
    Popup.pop.actionText = ACTIONTEXT;
    (<HTMLDivElement>Popup.pop.div).hidden = false;
  }

  actionF: Function = () => this.close();

  /**
   * Metodo para indicar ponerla cerrar
   */
  ngOnInit(): void {
    this.close()
  }

  /**
   * Metodo para poder cerrar la ventana de aviso
   */
  close() {
    if (this === undefined) {
      var div = document.getElementById("popup")
      if (div !== null) {
        (<HTMLDivElement>div).hidden = true;
      }
      return
    }

    this.div = document.getElementById("popup");
    if (this.div !== null) {
      (<HTMLDivElement>this.div).hidden = true;
      // (<HTMLDivElement>this.div). = "none";
    }
  }

  /*
  When assign a new function the context is empty, So use a static/found object to use.
  Dont assign new this
   */
  setactionF(value?: Function, parameters?: object) {
    if (value === undefined) {
      return;
    }
    if (parameters === null) {
      this.actionF = () => value();
    } else {
      this.actionF = () => value(parameters);
    }
  }
}
