import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultistepStepComponent } from './multistep-step.component';

describe('MultistepStepComponent', () => {
  let component: MultistepStepComponent;
  let fixture: ComponentFixture<MultistepStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultistepStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultistepStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
