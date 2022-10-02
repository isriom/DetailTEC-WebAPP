import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GClientesComponent} from "./GClientes.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('GClientesComponent', () => {
  let component: GClientesComponent;
  let fixture: ComponentFixture<GClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GClientesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
