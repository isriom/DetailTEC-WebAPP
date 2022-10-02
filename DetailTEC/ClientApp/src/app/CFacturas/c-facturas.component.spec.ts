import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CFacturasComponent} from "./c-facturas.component";

/**
 * Metodo donde se realizar la configuracion de Angular
 */
describe('CFacturasComponent', () => {
  let component: CFacturasComponent;
  let fixture: ComponentFixture<CFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CFacturasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
