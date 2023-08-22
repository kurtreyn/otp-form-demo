import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MultistepFormService } from '../../services/multistep-form.service';

@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit, OnDestroy {
  methodStep!: FormGroup;
  confirmStep!: FormGroup;
  completeStep!: FormGroup;
  formStep!: string;
  otpCode!: string;
  unsubscribe!: any;

  constructor(private formBuilder: FormBuilder, private multistepFormService: MultistepFormService) {

  }

  ngOnInit(): void {
    this.multistepFormService.step.subscribe(step => {
      this.formStep = step;
    });

    this.methodStep = this.formBuilder.group({
      phone: ['', Validators.required]
    });

    this.confirmStep = this.formBuilder.group({
      confirm: ['', Validators.required]
    });

    this.completeStep = this.formBuilder.group({
      complete: ['', Validators.required]
    });

    console.log('initial formStep is: ', this.formStep);
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe
  }

  nextStep(): void {
    console.log('nextStep() called')
    if (this.formStep === '1') {
      this.multistepFormService.setStep('2');
      console.log('formStep is: ', this.formStep)
    } else if (this.formStep === '2') {
      this.multistepFormService.setStep('3');
    }
    else {
      this.multistepFormService.setStep('1');
    }
  }

  previousStep(): void {
    if (this.formStep === '3') {
      this.multistepFormService.setStep('2');
      console.log('formStep is: ', this.formStep)
    } else if (this.formStep === '2') {
      this.multistepFormService.setStep('1');
      console.log('formStep is: ', this.formStep)
    }
    else {
      return
    }
  }

  submit(): void {
    if (this.formStep === '2') {
      this.multistepFormService.setStep('3');
      // TODO: submit OTP code to BE
      console.log('formStep is: ', this.formStep)
    }
  }

}
