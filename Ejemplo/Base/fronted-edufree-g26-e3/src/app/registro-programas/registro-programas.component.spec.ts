import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProgramasComponent } from './registro-programas.component';

describe('RegistroProgramasComponent', () => {
  let component: RegistroProgramasComponent;
  let fixture: ComponentFixture<RegistroProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroProgramasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
