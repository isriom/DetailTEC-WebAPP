import {Component, OnInit} from '@angular/core';
import {clienteElement, ClientesComponent} from "../Clientes.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-EditarClientesComponent',
  templateUrl: './EditarClientes.component.html',
  styleUrls: ['./EditarClientes.component.css']
})
export class EditarClientesComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: ClientesComponent | undefined;

  get padre(): ClientesComponent {
    return <ClientesComponent>this._padre;
  }

  set padre(value: ClientesComponent) {
    this._padre = value;
  }

  _cliente: clienteElement | undefined;

  get cliente(): clienteElement {
    return <clienteElement>this._cliente;
  }

  set cliente(value: clienteElement) {
    this._cliente = value;
    console.log("cliente agregado")
    this._Cliente.controls.Nombre.setValue(this._cliente.nombre)
    this._Cliente.controls.Apellido_1.setValue(this._cliente.apellido_1)
    this._Cliente.controls.Apellido_2.setValue(this._cliente.apellido_2)
    this._Cliente.controls.Usuario.setValue(this._cliente.usuario)
    this._Cliente.controls.Password.setValue(this._cliente.password)
    this._Cliente.controls.Correo.setValue(this._cliente.correo)
    this._Cliente.controls.Puntos.setValue(this._cliente.puntos)
  }

  private _Cliente = new FormGroup({
    Password: new FormControl(),
    Nombre: new FormControl(),
    Apellido_1: new FormControl(),
    Apellido_2: new FormControl(),
    Usuario: new FormControl(),
    Puntos: new FormControl(),
    Correo: new FormControl(),
  });

  get Cliente(): any {
    return this._Cliente;
  }

  set Cliente(value: any) {
    this._Cliente = value;
  }

  ngOnInit() {

  }

  update() {
    console.log("update")
    if (this._cliente === undefined) {
      return;
    }
    this._cliente.nombre = this._Cliente.controls.Nombre.value
    this._cliente.apellido_1 = this._Cliente.controls.Apellido_1.value
    this._cliente.usuario = this._Cliente.controls.Usuario.value
    this._cliente.apellido_2 = this._Cliente.controls.Apellido_2.value
    this._cliente.password = this._Cliente.controls.Password.value
    this._cliente.correo = this._Cliente.controls.Correo.value
    this._cliente.puntos = this._Cliente.controls.Puntos.value

    this.http.post("https://localhost:7274/api/Admin/Clientes/update", this._cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      }), withCredentials: true
    }).subscribe(result => {
      console.log(result);

    }, error => console.error(error));
  }
}
