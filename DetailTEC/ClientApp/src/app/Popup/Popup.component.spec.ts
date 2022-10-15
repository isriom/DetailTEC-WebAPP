import {ComponentFixture, TestBed} from '@angular/core/testing';


// @ts-ignore
import {Popup} from "./Popup.component";

/**
 * Metodo de configuracion para Angular
 */
describe('Popup', () => {
  let component: Popup;
  let fixture: ComponentFixture<Popup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Popup]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Popup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
