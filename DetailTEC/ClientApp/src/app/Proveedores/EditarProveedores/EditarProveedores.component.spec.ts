import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditarProveedoresComponent} from "./EditarProveedores.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('trabadoresComponent', () => {
  let component: EditarProveedoresComponent;
  let fixture: ComponentFixture<EditarProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProveedoresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
