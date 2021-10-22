import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutChairmanComponent } from './about-chairman.component';

describe('AboutChairmanComponent', () => {
  let component: AboutChairmanComponent;
  let fixture: ComponentFixture<AboutChairmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutChairmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutChairmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
