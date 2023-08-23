import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MfaBusinessService } from 'src/app/services/mfa-business.service';

@Component({
  selector: 'app-multistep-form',
  templateUrl: './multistep-form.component.html',
  styleUrls: ['./multistep-form.component.css']
})
export class MultistepFormComponent implements OnInit, OnDestroy {
  mfaForm!: FormGroup;
  formStep!: string;
  otpStatus!: string;
  otpCode!: string;
  fakeValidOtpCode = '123456';
  phoneInput!: string;
  formattedPhone!: string;
  unsubscribe!: any;
  isValidFlg: boolean = true;

  constructor(private formBuilder: FormBuilder, private mfaBusinessService: MfaBusinessService) {

  }

  ngOnInit(): void {
    this.mfaBusinessService.step.subscribe(step => {
      this.formStep = step;
    });
    this.mfaBusinessService.status.subscribe(status => {
      console.log('status is: ', status)
      this.otpStatus = status;
    });

    this.mfaForm = this.formBuilder.group({
      phone: ['', Validators.required],
    });

    console.log('initial formStep is: ', this.formStep);
    console.log('initial phoneInput is: ', this.phoneInput)
  }


  ngOnDestroy(): void {
    // TODO: unsubscribe
  }


  nextStep(): void {
    if (this.formStep === '1') {
      this.mfaBusinessService.setStep('2');
      const phoneInput = this.mfaForm.get('phone')?.value;
      this.formattedPhone = phoneInput;
      this.phoneInput = phoneInput.replace(/\D/g, '');
      console.log('formattedPhone is: ', this.formattedPhone);
      console.log('phoneInput is: ', this.phoneInput)
      console.log('formStep is: ', this.formStep)
    } else if (this.formStep === '2') {
      this.mfaBusinessService.setStep('3');
    }
    else {
      this.mfaBusinessService.setStep('1');
    }
  }

  previousStep(): void {
    if (this.formStep === '3') {
      this.mfaBusinessService.setStep('2');
      console.log('formStep is: ', this.formStep)
    } else if (this.formStep === '2') {
      this.mfaBusinessService.setStep('1');
      console.log('formStep is: ', this.formStep)
    }
    else {
      return
    }
  }

  submit(): void {
    if (this.formStep === '2') {
      // TODO: submit OTP code to BE
      if (this.otpCode === this.fakeValidOtpCode) {
        this.mfaBusinessService.setStatus('success');
        this.mfaBusinessService.setStep('3');
      } else {
        this.mfaBusinessService.setStatus('error');
      }
      console.log('formStep is: ', this.formStep)
      console.log('otpCode is: ', this.otpCode)
      console.log('otpStatus is: ', this.otpStatus)
    }
  }

  validatePhoneNo(field: any) {
    let phoneNumDigits = field.value.replace(/\D/g, '');

    this.isValidFlg = (phoneNumDigits.length == 0 || phoneNumDigits.length == 10);

    let formattedNumber = phoneNumDigits;
    if (phoneNumDigits.length >= 6)
      formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3, 6) + '-' + phoneNumDigits.substring(6);
    else if (phoneNumDigits.length >= 3)
      formattedNumber = '(' + phoneNumDigits.substring(0, 3) + ') ' + phoneNumDigits.substring(3);

    field.value = formattedNumber;
  }

}