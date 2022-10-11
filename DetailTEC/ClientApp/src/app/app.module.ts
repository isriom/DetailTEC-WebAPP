import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent, SafePipe} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {trabajadoresComponent} from "./trabajadores/trabajadores.component";
import {Popup} from "./Popup/Popup.component";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {EditarTrabajadorComponent} from "./trabajadores/EditarTrabajador/EditarTrabajador.component";
import {SucursalesComponent} from "./Sucursales/Sucursales.component";
import {EditarSucursalesComponent} from "./Sucursales/EditarSucursale/EditarSucursales.component";
import {ProveedoresComponent} from "./Proveedores/Proveedores.component";
import {EditarProveedoresComponent} from "./Proveedores/EditarProveedores/EditarProveedores.component";
/**
 * Declaraciones donde se agregan los componentes que va a tener la barra de menu
 */
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    trabajadoresComponent,
    SucursalesComponent,
    ProveedoresComponent,
    Popup,
    SafePipe,
    EditarTrabajadorComponent,
    EditarSucursalesComponent,
    EditarProveedoresComponent


  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule,

    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'Trabajadores', data: {title: "Gestion Trabajadores"}, component: trabajadoresComponent},
      {path: 'Sucursales', data: {title: "Gestion Sucursales"}, component: SucursalesComponent},
      {path: 'Proveedores', data: {title: "Gestion Proveedores"}, component: ProveedoresComponent},
    ]),
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
