import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RCitasComponent} from "./Rcitas.component";

/**
 * Metodo para realizar la configuracion del angular
 */
describe('RCitasComponent', () => {
  let component: RCitasComponent;
  let fixture: ComponentFixture<RCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RCitasComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
