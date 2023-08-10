import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.css']
})
export class OtpFormComponent implements OnInit {
  @Input() formType: string = '';
  @Input() formTitle?: string;
  @Output() form_type = new EventEmitter<any>()

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      otpCode: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public resetForm() {
    this.form.reset();
  }

  handleSubmit() {
    this.form_type.emit(this.form.value);
  }
}
