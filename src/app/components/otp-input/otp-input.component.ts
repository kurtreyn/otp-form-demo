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
  scheduledFocus: number | null = null;
  // onChange & onTouched are props that will be used to store functions in
  onChange?: (value: string) => void;
  onTouched?: () => void;

  @ViewChildren('inputElement') inputEls!: QueryList<ElementRef<HTMLInputElement>>;


  ngOnInit(): void {
    this.inputs = this.getFormArray(this.size);
  }

  // getFormArray is used to create a form array of the size that is passed in
  getFormArray(size: number): FormArray {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(new FormControl(''));
    }
    return new FormArray(arr);
  }


  /* 
  *registerOnChange, registerOnTouched, writeValue, & setDisabledState are used to save *the functions into the props
  *
  */
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
        this.scheduledFocus = idx - 1;
      }
    }
  }

  handleInput(): void {
    this.updateWiredValue();
    if (this.scheduledFocus !== null) {
      this.focusInput(this.scheduledFocus);
      this.scheduledFocus = null;
    }
  }

  handleKeyPress(e: KeyboardEvent, idx: number): boolean {
    const isDigit = /\d/.test(e.key);
    // Safari fires Cmd + V through keyPress, needs to be handled and let it through
    if (e.key === 'v' && e.metaKey) {
      return true;
    }
    // if user inputs digit & not on last input, advance the focus to the next input
    if (isDigit && idx + 1 < this.size) {
      this.scheduledFocus = idx + 1;
    }
    // if user deselects an input that has a value, clear the value so it doesn't have more than 1 digit
    if (isDigit && this.inputs.controls[idx].value) {
      this.inputs.controls[idx].setValue('');
    }
    return isDigit;
  }

  handlePaste(e: ClipboardEvent, idx: number): void {
    e.preventDefault();
    if (idx !== 0) {
      // updated the code to set the idx to 0, so that regardless of the input the user selects, it will start the pasted value at the first input (idx 0)
      idx = 0;
      this.scheduledFocus = idx;
      // originally, the code checked if the idx was 0, and if it wasn't, it would return and exit the function.
      // return;
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
