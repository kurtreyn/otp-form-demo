import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultistepFormChildComponent } from './multistep-form-child.component';

describe('MultistepFormChildComponent', () => {
  let component: MultistepFormChildComponent;
  let fixture: ComponentFixture<MultistepFormChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultistepFormChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultistepFormChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
