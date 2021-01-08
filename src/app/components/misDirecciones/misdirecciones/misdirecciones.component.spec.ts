import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdireccionesComponent } from './misdirecciones.component';

describe('MisdireccionesComponent', () => {
  let component: MisdireccionesComponent;
  let fixture: ComponentFixture<MisdireccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisdireccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdireccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
