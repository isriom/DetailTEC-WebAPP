import {Component, OnInit} from '@angular/core';
import {RCitasComponent} from "../RCitas.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {citaElement} from "../../../Admin/Citas/Citas.component";


@Component({
  selector: 'app-EditarRCitasComponent',
  templateUrl: './EditarRCitas.component.html',
  styleUrls: ['./EditarRCitas.component.css']
})
export class EditarRCitasComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: RCitasComponent | undefined;

  get padre(): RCitasComponent {
    return <RCitasComponent>this._padre;
  }

  set padre(value: RCitasComponent) {
    this._padre = value;
    // this.kinds = this.padre.kinds;
    // this.branchs = this.padre.branchs;
    console.log(this.branchs);
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
    this._Cita.controls.Puntos.setValue(this._cita.puntos)
  }

  private _Cita = new FormGroup({
    Fecha: new FormControl(),
    Tipo: new FormControl(),
    Sucursal: new FormControl(),
    Puntos: new FormControl()
  });
  kinds: string[] = ["asd"];
  branchs: string[] = ["asd"];

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
    (this._cita.puntos) = this._Cita.controls.Puntos.value;

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
