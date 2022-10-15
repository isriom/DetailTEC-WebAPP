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
    Popup,
    SafePipe,
    EditarTrabajadorComponent,
    EditarSucursalesComponent,
    EditarProveedoresComponent,
    EditarInsumosComponent,
    EditarLavadosComponent,
    EditarClientesComponent,
    EditarCitasComponent,


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
      },
    ]),
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
