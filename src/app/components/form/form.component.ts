import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  otpCode = ''


  onSubmit(): void {
    alert('Your OTP Code is: ' + this.otpCode)
    this.otpCode = ''
  }
}
