import {Component, OnInit} from '@angular/core';
import {InsumoComponent, insumoElement} from "../Insumos.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarInsumosComponent',
  templateUrl: './EditarInsumos.component.html',
  styleUrls: ['./EditarInsumos.component.css']
})
export class EditarInsumosComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: InsumoComponent | undefined;

  get padre(): InsumoComponent {
    return <InsumoComponent>this._padre;
  }

  set padre(value: InsumoComponent) {
    this._padre = value;
  }

  _insumo: insumoElement | undefined;

  get insumo(): insumoElement {
    return <insumoElement>this._insumo;
  }

  set insumo(value: insumoElement) {
    this._insumo = value;
    console.log("insumo agregado")
    this._Insumo.controls.Nombre.setValue(this._insumo.nombre)
    this._Insumo.controls.Marca.setValue(this._insumo.marca)
    this._Insumo.controls.Costo.setValue(this._insumo.costo)
    this._Insumo.controls.Proveedores.setValue(this._insumo.proveedores)
  }

  private _Insumo = new FormGroup({
    Nombre: new FormControl(),
    Marca: new FormControl(),
    Costo: new FormControl(),
    Proveedores: new FormControl()
  });

  get Insumo(): any {
    return this._Insumo;
  }

  set Insumo(value: any) {
    this._Insumo = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._insumo === undefined) {
      console.log("error")

      return;
    }
    (this._insumo.nombre) = this._Insumo.controls.Nombre.value;
    (this._insumo.marca) = this._Insumo.controls.Marca.value;
    (this._insumo.costo) = this._Insumo.controls.Costo.value;
    (this._insumo.proveedores) = this._Insumo.controls.Proveedores.value;

    var res = this.http.post("https://localhost:7274/api/Admin/Insumos/update", [this._insumo], {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      }), withCredentials: true
    })
    res.subscribe(result => {
      console.log(result);

    }, error => console.error(error));

  }
}
