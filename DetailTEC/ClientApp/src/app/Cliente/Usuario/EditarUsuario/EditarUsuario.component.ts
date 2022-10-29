import {Component, OnInit} from '@angular/core';
import {UsuarioComponent} from "../Usuario.component";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {clienteElement} from "../../../Admin/Clientes/Clientes.component";


@Component({
  selector: 'app-EditarUsuarioComponent',
  templateUrl: './EditarUsuario.component.html',
  styleUrls: ['./EditarUsuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, public http: HttpClient) {
    console.log("modal creado")
  }

  private _padre: UsuarioComponent | undefined;

  get padre(): UsuarioComponent {
    return <UsuarioComponent>this._padre;
  }

  set padre(value: UsuarioComponent) {
    this._padre = value;
  }

  _cliente: clienteElement | undefined;

  get cliente(): clienteElement {
    return <clienteElement>this._cliente;
  }

  set cliente(value: clienteElement) {
    this._cliente = value;
    this._Cliente.controls.Nombre.setValue(this._cliente.nombre)
    this._Cliente.controls.Usuario.setValue(this._cliente.usuario)
    this._Cliente.controls.Password.setValue(this._cliente.password)
    this._Cliente.controls.Correo.setValue(this._cliente.correo)
  }

  private _Cliente = new FormGroup({
    Password: new FormControl(),
    Nombre: new FormControl(),
    Usuario: new FormControl(),
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
    this._cliente.usuario = this._Cliente.controls.Usuario.value
    this._cliente.password = this._Cliente.controls.Password.value
    this._cliente.correo = this._Cliente.controls.Correo.value

    this.http.post("https://localhost:7274/api/client/Usuario/update", this._cliente, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'withCredentials': 'true'
      }), withCredentials: true
    }).subscribe(result => {
      console.log(result);

    }, error => console.error(error));
  }
}
