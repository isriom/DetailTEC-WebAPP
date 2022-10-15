import {Component, OnInit} from '@angular/core';
import {LavadosComponent, lavadoElement} from "../Lavados.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarLavadosComponent',
  templateUrl: './EditarLavados.component.html',
  styleUrls: ['./EditarLavados.component.css']
})
export class EditarLavadosComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: LavadosComponent | undefined;

  get padre(): LavadosComponent {
    return <LavadosComponent>this._padre;
  }

  set padre(value: LavadosComponent) {
    this._padre = value;
  }

  _lavado: lavadoElement | undefined;

  get lavado(): lavadoElement {
    return <lavadoElement>this._lavado;
  }

  set lavado(value: lavadoElement) {
    this._lavado = value;
    console.log("lavado agregado")
    this._Lavado.controls.Duracion.setValue(this._lavado.duracion)
    this._Lavado.controls.Productos.setValue(this._lavado.productos)
    this._Lavado.controls.Lavador.setValue(this._lavado.lavador)
    this._Lavado.controls.Pulidor.setValue(this._lavado.pulidor)
    this._Lavado.controls.Costo.setValue(this._lavado.costo)
    this._Lavado.controls.Puntuacion_Ganancia.setValue(this._lavado.puntuacion_ganancia)
    this._Lavado.controls.Puntuacion_Coste.setValue(this._lavado.puntuacion_coste)
    this._Lavado.controls.Precio.setValue(this._lavado.precio)
  }

  private _Lavado = new FormGroup({
    Costo: new FormControl(),
    Precio: new FormControl(),
    Duracion: new FormControl(),
    Productos: new FormControl(),
    Lavador: new FormControl(),
    Pulidor: new FormControl(),
    Puntuacion_Coste: new FormControl(),
    Puntuacion_Ganancia: new FormControl(),
  });

  get Lavado(): any {
    return this._Lavado;
  }

  set Lavado(value: any) {
    this._Lavado = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._lavado === undefined) {
      return;
    }
    this._lavado.duracion = this._Lavado.controls.Duracion.value
    this._lavado.productos = this._Lavado.controls.Productos.value
    this._lavado.pulidor = this._Lavado.controls.Pulidor.value
    this._lavado.lavador = this._Lavado.controls.Lavador.value
    this._lavado.costo = this._Lavado.controls.Costo.value
    this._lavado.puntuacion_ganancia = this._Lavado.controls.Puntuacion_Ganancia.value
    this._lavado.puntuacion_coste = this._Lavado.controls.Puntuacion_Coste.value
    this._lavado.precio = this._Lavado.controls.Precio.value

    this.http.patch("https://localhost:7274/api/EditLavado", this._lavado, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      })
    })
  }
}
