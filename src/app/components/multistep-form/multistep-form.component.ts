import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MfaBusinessService } from 'src/app/services/mfa-business.service';

@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit, OnDestroy {
  steps: any[] = []; // Define an array to hold form steps dynamically
  formStep!: string;
  otpStatus!: string;
  otpCode!: string;
  fakeValidOtpCode = '123456';
  isValidFlg: boolean = true;

  constructor(private formBuilder: FormBuilder, private mfaBusinessService: MfaBusinessService) {
    this.steps = [
      {
        type: 'input',
        formGroup: this.formBuilder.group({
          phone: ['', Validators.required]
        }),
        stepNumber: 1,
        label: 'Phone Number:',
        inputType: 'text',
        controlName: 'phone',
        validationFn: (target: any) => this.validatePhoneNo(target),
        buttonType: ''
      },
      {
        type: 'input',
        formGroup: this.formBuilder.group({
          confirm: ['', Validators.required]
        }),
        stepNumber: 2,
        label: 'Enter OTP Code:',
        inputType: 'text',
        controlName: 'confirm',
        validationFn: () => { }, // No validation in this step
        buttonType: ''
      },
      {
        type: 'button',
        formGroup: null,
        stepNumber: 3,
        label: 'Submit',
        inputType: '',
        controlName: '',
        validationFn: () => { }, // No validation for buttons
        buttonType: 'submit'
      }
    ];
  }

  ngOnInit(): void {
    this.mfaBusinessService.step.subscribe(step => {
      this.formStep = step;
    });
    this.mfaBusinessService.status.subscribe(status => {
      console.log('status is: ', status)
      this.otpStatus = status;
    });
  }

  ngOnDestroy(): void {
    // TODO: unsubscribe
  }

  onFormSubmit(step: any, index: number): void {
    if (index === 0) {
      this.nextStep();
    } else if (index === 1) {
      this.submit();
    }
  }

  nextStep(): void {
    if (this.formStep === '1') {
      this.mfaBusinessService.setStep('2');
    } else if (this.formStep === '2') {
      // Handle logic for moving to the next step
    }
  }

  submit(): void {
    if (this.formStep === '2') {
      // Handle logic for submitting OTP
    }
  }

  validatePhoneNo(target: any) {
    let phoneNumDigits = target.value.replace(/\D/g, '');

    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 10);

    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 6)
      formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3, 6) + '-' + phoneNumDigits.substring(6);
    else if (phoneNumDigits.length >= 3)
      formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3);

    target.value = formattedNumber;
  }
}
