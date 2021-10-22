import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAdmissionFormComponent } from './download-admission-form.component';

describe('DownloadAdmissionFormComponent', () => {
  let component: DownloadAdmissionFormComponent;
  let fixture: ComponentFixture<DownloadAdmissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAdmissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAdmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
