import {Component, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


/**
 * Global variable for
 */


/**
 * atribute class representation
 */
class atribute {

  public static colums: string[];
  public static body: HTMLTableSectionElement;
  tr: HTMLTableRowElement = document.createElement("tr");
  public inputs: HTMLInputElement[] = [];
  tb1: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    })
  };
  http: HttpClient;


  constructor(table1: string, data: string[], foot: boolean = false, http: HttpClient) {
    this.tb1 = table1;
    this.http = http;
    if (foot) {
      this.foot(data);
      return;
    }
    atribute.body.appendChild(this.tr);
    for (const cell in data) {

      var td = document.createElement("td")
      this.tr.appendChild(td)
      var input = document.createElement("input");
      input.className = "mat-input-element"
      input.value = cell;
      td.appendChild(input)
      this.inputs.push(input)
    }
    var bt = <HTMLButtonElement>document.createElement("button")
    bt.value = "Eliminar";
    this.tr.appendChild(bt);
    return;

  }

  foot(data: string[]) {
    // body should be replaced with foot before
    atribute.body.appendChild(this.tr);
    for (const cell in data) {
      var td = document.createElement("td")
      this.tr.appendChild(td)
      var input = document.createElement("input");
      input.className = "mat-input-element"
      input.value = cell;
      td.appendChild(input)
      this.inputs.push(input)
    }
    var bt = <HTMLButtonElement>document.createElement("button")
    bt.value = "Agregar"
    this.tr.appendChild(bt);

    bt.click = async () => {
      const answer = new Datapackage([], [[]]);
      this.inputs.forEach((input) => {
        answer.data[0].push(input.value.toString());
      })
      let res = await this.http.put("https://localhost:7274/api/Admin/" + this.tb1 + "/add", answer, {
          headers: this.httpOptions.headers,
          withCredentials: true,
        }
      )
      res.subscribe(result => {
        console.log(result);

      }, error => console.error(error));
      console.log(res)
    };
    return;
  }

}

/**
 * package class representation
 */
class Datapackage {
  constructor(columns: string[], data: string[][]) {
    this._columns = columns;
    this._data = data;
  }

  private _columns: string[];

  get columns(): string[] {
    return this._columns;
  }

  set columns(value: string[]) {
    this._columns = value;
  }

  private _data: string[][];

  get data(): string[][] {
    return this._data;
  }

  set data(value: string[][]) {
    this._data = value;
  }
}

@Component({
  selector: 'app-TablaRelaciones',
  templateUrl: './TablaRelaciones.component.html',
  styleUrls: ['./TablaRelaciones.component.css']
})
/**
 * Cite management class
 */
export class TablaRelacionesComponent {

  //Variables utilizadas
  token = sessionStorage.getItem("tokenKey");
  Rol = sessionStorage.getItem("Rol");
  URL = "";
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
  displayedColumns: string[] = ["eliminar"]
  filas: string[] = [];
  actualEditor: NgbModalRef | undefined;

  public table1: string = "";
  public foot: HTMLTableSectionElement = <HTMLTableSectionElement>document.getElementById("Foot");
  public head: HTMLTableSectionElement = <HTMLTableSectionElement>document.getElementById("Head");

  /**
   * Class constructor
   * @param http Http client to make the requests
   * @param baseUrl Actual URL, not in use because the static references
   * @param _modal modal to show edit component, injected
   * @param table1 table of the relation
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public _modal: NgbModal,) {
    this.http = http;
    this.baseurl = baseUrl;
    atribute.body = <HTMLTableSectionElement>document.getElementById("Body");
  }

  /**
   * method to load the data from the server and put it in the view
   * @constructor called in
   */
  public get_Package() {
    atribute.body = <HTMLTableSectionElement>document.getElementById("Body");
    this.URL = "https://localhost:7274/api/" + this.Rol + "/" + this.table1;
    var res = this.http.get<string>(this.URL + "/list", {
      headers: this.httpOptions.headers,
      withCredentials: true
    })
      .subscribe(
        result => {
          this.respuesta = result;
          console.log(this.respuesta);
          var ColData = (<Datapackage><unknown>result);
          this.displayedColumns = ColData.columns
          ColData.data.forEach((col, key) => new atribute(this.table1, col, false, this.http))
          atribute.body = this.foot
          new atribute(this.table1, ColData.columns, true, this.http);
        },
        error =>
          console.error(error));
  }


  clean() {

  }
}
