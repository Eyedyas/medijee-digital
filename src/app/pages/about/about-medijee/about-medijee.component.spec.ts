import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMedijeeComponent } from './about-medijee.component';

describe('AboutMedijeeComponent', () => {
  let component: AboutMedijeeComponent;
  let fixture: ComponentFixture<AboutMedijeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMedijeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMedijeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
