import {Component, OnInit} from '@angular/core';
import {SucursalesComponent, sucursalElement} from "../Sucursales.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarSucursalesComponent',
  templateUrl: './EditarSucursales.component.html',
  styleUrls: ['./EditarSucursales.component.css']
})
export class EditarSucursalesComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: SucursalesComponent | undefined;

  get padre(): SucursalesComponent {
    return <SucursalesComponent>this._padre;
  }

  set padre(value: SucursalesComponent) {
    this._padre = value;
  }

  _sucursal: sucursalElement | undefined;

  get sucursal(): sucursalElement {
    return <sucursalElement>this._sucursal;
  }

  set sucursal(value: sucursalElement) {
    this._sucursal = value;
    console.log("sucursal agregado")
    this._Sucursal.controls.Telefono.setValue(this._sucursal.telefono)
    this._Sucursal.controls.Fecha_de_Apertura.setValue(this._sucursal.fecha_de_apertura)
    this._Sucursal.controls.Gerente.setValue(this._sucursal.gerente)
    this._Sucursal.controls.Canton.setValue(this._sucursal.canton)
    this._Sucursal.controls.Provincia.setValue(this._sucursal.provincia)
    this._Sucursal.controls.Fecha_gerente.setValue(this._sucursal.fecha_gerente)
    this._Sucursal.controls.Distrito.setValue(this._sucursal.distrito)
  }

  private _Sucursal = new FormGroup({
    Provincia: new FormControl(),
    Canton: new FormControl(),
    Distrito: new FormControl(),
    Telefono: new FormControl(),
    Fecha_de_Apertura: new FormControl(),
    Gerente: new FormControl(),
    Fecha_gerente: new FormControl(),
  });

  get Sucursal(): any {
    return this._Sucursal;
  }

  set Sucursal(value: any) {
    this._Sucursal = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._sucursal === undefined) {
      return;
    }
    (this._sucursal.telefono) = this._Sucursal.controls.Telefono.value;
    (this._sucursal.fecha_de_apertura) = this._Sucursal.controls.Fecha_de_Apertura.value;
    (this._sucursal.gerente) = this._Sucursal.controls.Gerente.value;
    (this._sucursal.provincia) = this._Sucursal.controls.Provincia.value;
    (this._sucursal.canton) = this._Sucursal.controls.Canton.value;
    (this._sucursal.fecha_gerente) = this._Sucursal.controls.Fecha_gerente.value;
    (this._sucursal.distrito) = this._Sucursal.controls.Distrito.value;

    this.http.patch("https://localhost:7274/api/EditSucursal", this._sucursal, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      })
    })
  }
}
