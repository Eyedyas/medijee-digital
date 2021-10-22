import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionProcedureComponent } from './admission-procedure.component';

describe('AdmissionProcedureComponent', () => {
  let component: AdmissionProcedureComponent;
  let fixture: ComponentFixture<AdmissionProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
