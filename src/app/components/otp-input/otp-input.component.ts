import { ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';


@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OtpInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtpInputComponent,
      multi: true,
    },
  ],
})
export class OtpInputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() size = 6;
  inputs!: FormArray;
  _scheduledFocus: number | null = null;

  @ViewChildren('inputElement') inputEls!: QueryList<ElementRef<HTMLInputElement>>;


  ngOnInit(): void {
    this.inputs = this.getFormArray(this.size);
  }

  getFormArray(size: number): FormArray {
    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(new FormControl(''));
    }
    return new FormArray(arr);
  }

  onChange?: (value: string) => void;
  onTouched?: () => void;

  writeValue(value: string): void {
    this.inputs.setValue(new Array(this.size).fill(''));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputs.disable() : this.inputs.enable();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!control.value || control.value.length < this.size) {
      return { otpInput: 'Value is incorrect' };
    }
    return null;
  }

  handleKeyDown(e: KeyboardEvent, idx: number): void {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (idx > 0) {
        this._scheduledFocus = idx - 1;
      }
    }
  }

  handleInput(): void {
    this.updateWiredValue();

    if (this._scheduledFocus !== null) {
      this.focusInput(this._scheduledFocus);
      this._scheduledFocus = null;
    }
  }

  handleKeyPress(e: KeyboardEvent, idx: number): boolean {
    const isDigit = /\d/.test(e.key);
    if (e.key === 'v' && e.metaKey) {
      return true;
    }

    if (isDigit && idx + 1 < this.size) {
      this._scheduledFocus = idx + 1;
    }

    if (isDigit && this.inputs.controls[idx].value) {
      this.inputs.controls[idx].setValue('');
    }

    return isDigit;
  }

  handlePaste(e: ClipboardEvent, idx: number): void {
    e.preventDefault();

    if (idx !== 0) {
      return;
    }

    const pasteData = e.clipboardData?.getData('text');
    const regex = new RegExp(`\\d{${this.size}}`);

    if (!pasteData || !regex.test(pasteData)) {
      return;
    }

    for (let i = 0; i < pasteData.length; i++) {
      this.inputs.controls[i].setValue(pasteData[i]);
    }

    this.focusInput(this.inputEls.length - 1);
    this.updateWiredValue();
    this.onTouched?.();
  }

  handleFocus(e: FocusEvent): void {
    (e.target as HTMLInputElement).select();
  }

  focusInput(idx: number): void {
    setTimeout(() => this.inputEls.get(idx)?.nativeElement.focus());
  }

  updateWiredValue(): void {
    setTimeout(() => this.onChange?.(this.inputs.value.join('')));
  }

}
