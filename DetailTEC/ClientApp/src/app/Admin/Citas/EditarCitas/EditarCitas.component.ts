import {Component, OnInit} from '@angular/core';
import {citaElement, CitasComponent} from "../Citas.component";
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
    console.log("cita agregado")
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
    console.log(JSON.stringify(this._cita))
    if (this._cita === undefined) {
      console.log("dentro");

      return;
    }
    console.log(JSON.stringify(this._cita));
    (this._cita.fecha) = this._Cita.controls.Fecha.value;
    (this._cita.tipo) = this._Cita.controls.Tipo.value;
    (this._cita.sucursal) = this._Cita.controls.Sucursal.value;

    var res = this.http.post("https://localhost:7274/api/Admin/Citas/update", this.cita, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      },), withCredentials: true
    })
    res.subscribe(result => {
      console.log(result);

    }, error => console.error(error));
    console.log(res)
  }
}
