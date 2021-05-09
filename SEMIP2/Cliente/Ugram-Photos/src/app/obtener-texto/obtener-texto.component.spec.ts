import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerTextoComponent } from './obtener-texto.component';

describe('ObtenerTextoComponent', () => {
  let component: ObtenerTextoComponent;
  let fixture: ComponentFixture<ObtenerTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObtenerTextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
