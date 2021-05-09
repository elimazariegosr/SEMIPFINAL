import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOficioComponent } from './crear-oficio.component';

describe('CrearOficioComponent', () => {
  let component: CrearOficioComponent;
  let fixture: ComponentFixture<CrearOficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOficioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
