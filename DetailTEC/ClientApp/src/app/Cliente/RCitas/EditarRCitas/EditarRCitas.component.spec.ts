import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditarSucursalesComponent} from "./EditarSucursales.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('trabadoresComponent', () => {
  let component: EditarSucursalesComponent;
  let fixture: ComponentFixture<EditarSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarSucursalesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
