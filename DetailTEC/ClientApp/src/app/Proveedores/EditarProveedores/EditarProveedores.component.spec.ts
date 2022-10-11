import {ComponentFixture, TestBed} from '@angular/core/testing';

import {trabajadoresComponent} from "./trabajadores.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('trabadoresComponent', () => {
  let component: trabajadoresComponent;
  let fixture: ComponentFixture<trabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [trabajadoresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(trabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
