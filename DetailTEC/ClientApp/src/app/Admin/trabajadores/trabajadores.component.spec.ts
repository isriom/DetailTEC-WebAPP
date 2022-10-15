import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrabajadoresComponent} from "./trabajadores.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('TrabadoresComponent', () => {
  let component: TrabajadoresComponent;
  let fixture: ComponentFixture<TrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrabajadoresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
