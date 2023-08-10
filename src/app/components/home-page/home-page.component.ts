import { Component, ViewChild, OnChanges } from '@angular/core';

import { OtpFormComponent } from '../otp-form/otp-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  log!: any;
  public error: any = [];
  public success = null;
  public mfaEnabled = false;

  @ViewChild('otpForm') otpForm!: OtpFormComponent;

  onSubmit() {
    this.otpForm.handleSubmit();
  }



  handleResponseMfa(data: any) {
    this.success = data.message;
    this.otpForm.resetForm();

  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Login failed');
  }
}
