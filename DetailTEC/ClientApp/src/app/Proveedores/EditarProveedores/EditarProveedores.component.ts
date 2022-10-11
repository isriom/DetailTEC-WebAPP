import {Component, OnInit} from '@angular/core';
import {ProveedoresComponent, proveedorElement} from "../Proveedores.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarProveedoresComponent',
  templateUrl: './EditarProveedores.component.html',
  styleUrls: ['./EditarProveedores.component.css']
})
export class EditarProveedoresComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: ProveedoresComponent | undefined;

  get padre(): ProveedoresComponent {
    return <ProveedoresComponent>this._padre;
  }

  set padre(value: ProveedoresComponent) {
    this._padre = value;
  }

  _proveedor: proveedorElement | undefined;

  get proveedor(): proveedorElement {
    return <proveedorElement>this._proveedor;
  }

  set proveedor(value: proveedorElement) {
    this._proveedor = value;
    console.log("proveedor agregado")
    this._Proveedor.controls.nombre.setValue(this._proveedor.nombre)
    this._Proveedor.controls.juridica.setValue(this._proveedor.juridica)
    this._Proveedor.controls.direccion.setValue(this._proveedor.direccion)
    this._Proveedor.controls.contacto.setValue(this._proveedor.contacto)
    this._Proveedor.controls.correo.setValue(this._proveedor.correo)
  }

  private _Proveedor = new FormGroup({
    nombre: new FormControl(),
    juridica: new FormControl(),
    direccion: new FormControl(),
    contacto: new FormControl(),
    correo: new FormControl()
  });

  get Proveedor(): any {
    return this._Proveedor;
  }

  set Proveedor(value: any) {
    this._Proveedor = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._proveedor === undefined) {
      return;
    }
    this._proveedor.nombre = this._Proveedor.controls.nombre.value
    this._proveedor.juridica = this._Proveedor.controls.juridica.value
    this._proveedor.direccion = this._Proveedor.controls.direccion.value
    this._proveedor.contacto = this._Proveedor.controls.contacto.value
    this._proveedor.correo = this._Proveedor.controls.correo.value

    this.http.patch("https://localhost:7274/api/EditProveedor", this._proveedor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      })
    })
  }
}
