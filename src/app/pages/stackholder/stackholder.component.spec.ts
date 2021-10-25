import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackholderComponent } from './stackholder.component';

describe('StackholderComponent', () => {
  let component: StackholderComponent;
  let fixture: ComponentFixture<StackholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
