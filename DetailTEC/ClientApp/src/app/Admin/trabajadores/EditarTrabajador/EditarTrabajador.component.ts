import {Component, OnInit} from '@angular/core';
import {TrabajadoresComponent, workerElement} from "../trabajadores.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarTrabajadorComponent',
  templateUrl: './EditarTrabajador.component.html',
  styleUrls: ['./EditarTrabajador.component.css']
})
export class EditarTrabajadorComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {

  }

  private _padre: TrabajadoresComponent | undefined;

  get padre(): TrabajadoresComponent {
    return <TrabajadoresComponent>this._padre;
  }

  set padre(value: TrabajadoresComponent) {
    this._padre = value;
  }

  private _worker: workerElement | undefined;

  get worker(): workerElement {
    return <workerElement>this._worker;
  }

  set worker(value: workerElement) {
    this._worker = value;
    this._trabajador.controls.Fecha_de_nacimiento.setValue(this._worker.fecha_de_nacimiento)
    this._trabajador.controls.edad.setValue(this._worker.edad)
    this._trabajador.controls.rol.setValue(this._worker.rol)
    this._trabajador.controls.pago.setValue(this._worker.pago)
    this._trabajador.controls.Nombre.setValue(this._worker.nombre)
    this._trabajador.controls.Apellidos.setValue(this._worker.apellidos)
    this._trabajador.controls.password.setValue(this._worker.password)
    this._trabajador.controls.Fecha_de_ingreso.setValue(this._worker.fecha_de_ingreso)
  }

  private _trabajador = new FormGroup({
    Nombre: new FormControl(),
    Apellidos: new FormControl(),
    Fecha_de_ingreso: new FormControl(),
    Fecha_de_nacimiento: new FormControl(),
    edad: new FormControl(),
    rol: new FormControl(),
    password: new FormControl(),
    pago: new FormControl()
  });

  get trabajador(): any {
    return this._trabajador;
  }

  set trabajador(value: any) {
    this._trabajador = value;
  }

  ngOnInit() {

  }

  update() {
    if (this._worker === undefined) {
      return;
    }
    (this._worker.fecha_de_nacimiento) = this._trabajador.controls.Fecha_de_nacimiento.value;
    (this._worker.edad) = this._trabajador.controls.edad.value;
    (this._worker.rol) = this._trabajador.controls.rol.value;
    (this._worker.pago) = this._trabajador.controls.pago.value;
    (this._worker.nombre) = this._trabajador.controls.Nombre.value;
    (this._worker.apellidos) = this._trabajador.controls.Apellidos.value;
    (this._worker.password) = this._trabajador.controls.password.value;
    (this._worker.fecha_de_ingreso) = this._trabajador.controls.Fecha_de_ingreso.value;

    var res = this.http.post("https://localhost:7274/api/Admin/Insumos/update", [this._worker], {
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
