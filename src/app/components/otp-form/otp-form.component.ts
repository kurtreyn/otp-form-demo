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
      txt1: new FormControl('', [Validators.minLength(1)]),
      txt2: new FormControl('', [Validators.minLength(1)]),
      txt3: new FormControl('', [Validators.minLength(1)]),
      txt4: new FormControl('', [Validators.minLength(1)]),
      txt5: new FormControl('', [Validators.minLength(1)]),
      txt6: new FormControl('', [Validators.minLength(1)]),
    });
  }

  get otpCode() {
    return this.form.get('otpCode');
  }

  public resetForm() {
    this.form.reset();
  }

  handleSubmit() {
    this.form_type.emit(this.form.value);
  }

  handleKeyUp(event: any, prev: any, current: any, next: any) {
    let length = current.value.length;
    let maxLength = current.getAttribute('maxlength');
    console.log('length', length)
    console.log('maxLength', maxLength)
    console.log(`prev ${prev} current ${current} next ${next}`)
    if (length === maxLength) {
      if (next != "") {
        next.focus();
      }
    }
    if (event.key === 'Backspace') {
      if (prev != '') {
        prev.focus();
      }
    }
    console.log('event', event)
  }

}
