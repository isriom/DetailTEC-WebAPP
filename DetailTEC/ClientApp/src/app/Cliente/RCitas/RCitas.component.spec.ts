import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SucursalesComponent} from "./Sucursales.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('trabadoresComponent', () => {
  let component: SucursalesComponent;
  let fixture: ComponentFixture<SucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
