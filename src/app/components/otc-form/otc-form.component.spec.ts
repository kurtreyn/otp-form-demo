import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtcFormComponent } from './otc-form.component';

describe('OtcFormComponent', () => {
  let component: OtcFormComponent;
  let fixture: ComponentFixture<OtcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtcFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
