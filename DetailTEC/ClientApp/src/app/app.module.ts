import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent, SafePipe} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {TrabajadoresComponent} from "./Admin/trabajadores/trabajadores.component";
import {Popup} from "./Popup/Popup.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {EditarTrabajadorComponent} from "./Admin/trabajadores/EditarTrabajador/EditarTrabajador.component";
import {SucursalesComponent} from "./Admin/Sucursales/Sucursales.component";
import {EditarSucursalesComponent} from "./Admin/Sucursales/EditarSucursale/EditarSucursales.component";
import {ProveedoresComponent} from "./Admin/Proveedores/Proveedores.component";
import {EditarProveedoresComponent} from "./Admin/Proveedores/EditarProveedores/EditarProveedores.component";
import {InsumoComponent} from "./Admin/Insumos/Insumos.component";
import {EditarInsumosComponent} from "./Admin/Insumos/EditarInsumos/EditarInsumos.component";
import {LavadosComponent} from "./Admin/Lavados/Lavados.component";
import {EditarLavadosComponent} from "./Admin/Lavados/EditarLavados/EditarLavados.component";
import {ClientesComponent} from "./Admin/Clientes/Clientes.component";
import {EditarClientesComponent} from "./Admin/Clientes/EditarClientes/EditarClientes.component";
import {CitasComponent} from "./Admin/Citas/Citas.component";
import {EditarCitasComponent} from "./Admin/Citas/EditarCitas/EditarCitas.component";
import {RCitasComponent} from "./Cliente/RCitas/RCitas.component";
import {EditarRCitasComponent} from "./Cliente/RCitas/EditarRCitas/EditarRCitas.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {UsuarioComponent} from "./Cliente/Usuario/Usuario.component";
import {RPuntosComponent} from "./Cliente/RPuntos/RPuntos.component";
import {TablaRelacionesComponent} from "./TablaRelaciones/TablaRelaciones.component";
import {EditarUsuarioComponent} from "./Cliente/Usuario/EditarUsuario/EditarUsuario.component";
import {InsumoLavadosComponent} from "./Admin/Lavados/InsumoLavado/InsumoLavado.component";
import {CitasInsumosComponent} from "./Admin/Citas/CitasInsumo/CitasInsumo.component";
import {CitasTrabajadoresComponent} from "./Admin/Citas/CitasTrabajadores/CitasTrabajadores.component";
import {DireccionesComponent} from "./Admin/Clientes/Direccion/Direccion.component";
import {TelefonoComponent} from "./Admin/Clientes/Telefono/Telefono.component";
import {GerentesComponent} from "./Admin/Sucursales/Gerente/Gerente.component";
import {ProveedorProductosComponent} from "./Admin/Insumos/ProveedorProducto/ProveedorProducto.component";
import {UDireccionesComponent} from "./Cliente/Usuario/Direccion/Direccion.component";
import {UTelefonoComponent} from "./Cliente/Usuario/Telefono/Telefono.component";

/**
 * Declaraciones donde se agregan los componentes que va a tener la barra de menu
 */
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TrabajadoresComponent,
    SucursalesComponent,
    ProveedoresComponent,
    InsumoComponent,
    LavadosComponent,
    ClientesComponent,
    CitasComponent,
    RCitasComponent,
    UsuarioComponent,
    RPuntosComponent,
    TablaRelacionesComponent,
    Popup,
    SafePipe,
    EditarTrabajadorComponent,
    EditarSucursalesComponent,
    EditarProveedoresComponent,
    EditarInsumosComponent,
    EditarLavadosComponent,
    EditarClientesComponent,
    EditarCitasComponent,
    EditarRCitasComponent,
    EditarUsuarioComponent,
    InsumoLavadosComponent,
    CitasInsumosComponent,
    CitasTrabajadoresComponent,
    DireccionesComponent,
    TelefonoComponent,
    GerentesComponent,
    ProveedorProductosComponent,
    UDireccionesComponent,
    UTelefonoComponent


  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule,

    RouterModule.forRoot([{path: '', component: HomeComponent, pathMatch: 'full'},

      {
        path: "admin", children: [
          {path: 'Trabajadores', data: {title: "Gestion Trabajadores"}, component: TrabajadoresComponent},
          {path: 'Sucursales', data: {title: "Gestion Sucursales"}, component: SucursalesComponent},
          {path: 'Proveedores', data: {title: "Gestion Proveedores"}, component: ProveedoresComponent},
          {path: 'Insumos', data: {title: "Gestion Insumo"}, component: InsumoComponent},
          {path: 'Lavados', data: {title: "Gestion Lavados"}, component: LavadosComponent},
          {path: 'Clientes', data: {title: "Gestion Cliente"}, component: ClientesComponent},
          {path: 'Citas', data: {title: "Gestion Citas"}, component: CitasComponent},]
      }, {
        path: "cliente", children: [
          {path: 'RCitas', data: {title: "Registro Citas"}, component: RCitasComponent},
          {path: 'RPuntos', data: {title: "Registro Puntaje"}, component: RPuntosComponent}
        ]
      }
    ]),
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
