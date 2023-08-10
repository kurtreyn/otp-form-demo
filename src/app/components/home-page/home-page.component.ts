import { Component, ViewChild, OnChanges } from '@angular/core';

import { OtpFormComponent } from '../otp-form/otp-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  data = ''
}
