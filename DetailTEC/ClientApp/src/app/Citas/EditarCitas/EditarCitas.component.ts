import {Component, OnInit} from '@angular/core';
import {CitasComponent, citaElement} from "../Citas.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarCitasComponent',
  templateUrl: './EditarCitas.component.html',
  styleUrls: ['./EditarCitas.component.css']
})
export class EditarCitasComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: CitasComponent | undefined;

  get padre(): CitasComponent {
    return <CitasComponent>this._padre;
  }

  set padre(value: CitasComponent) {
    this._padre = value;
  }

  _cita: citaElement | undefined;

  get cita(): citaElement {
    return <citaElement>this._cita;
  }

  set cita(value: citaElement) {
    this._cita = value;
    console.log("cita agregado")
    this._Cita.controls.Fecha.setValue(this._cita.fecha)
    this._Cita.controls.Tipo.setValue(this._cita.tipo)
    this._Cita.controls.Sucursal.setValue(this._cita.sucursal)
  }

  private _Cita = new FormGroup({
    Fecha: new FormControl(),
    Tipo: new FormControl(),
    Sucursal: new FormControl()
  });

  get Cita(): any {
    return this._Cita;
  }

  set Cita(value: any) {
    this._Cita = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._cita === undefined) {
      return;
    }
    (this._cita.fecha) = this._Cita.controls.Fecha.value;
    (this._cita.tipo) = this._Cita.controls.Tipo.value;
    (this._cita.sucursal) = this._Cita.controls.Sucursal.value;

    this.http.patch("https://localhost:7274/api/EditSucursal", this._cita, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      })
    })
  }
}
