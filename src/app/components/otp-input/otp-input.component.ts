import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { OtpInputService } from '../../services/otp-input.service';


@Component({
  selector: 'app-otp-input',
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
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements ControlValueAccessor, Validator {
  @Input()
  set size(size: number) {
    this.inputs = this.service.getFormArray(size);
    this.inputSize = size;
  }
  @Output() form_type = new EventEmitter<any>()
  inputSize = 6;
  _scheduledFocus: number = null!;
  inputs = this.service.getFormArray(this.inputSize);

  @ViewChildren('inputElement') inputEls!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private service: OtpInputService) { }


  onChange?: (value: string) => void;
  onTouched?: () => void;

  writeValue(value: string): void {
    // Reset all input values
    this.inputs.setValue(new Array(this.inputSize).fill(''));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputs.disable();
    } else {
      this.inputs.enable();
    }
  }

  validate(control: AbstractControl<string, string>): ValidationErrors | null {
    if (!control.value || control.value.length < this.inputSize) {
      return {
        otpInput: 'Value is incorrect',
      };
    }

    return null;
  }

  handleKeyDown(e: KeyboardEvent, idx: number) {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (idx > 0) {
        this._scheduledFocus = idx - 1;
      }
    }
  }


  handleInput() {
    this.updateWiredValue();

    if (this._scheduledFocus != null) {
      this.focusInput(this._scheduledFocus);
      this._scheduledFocus = null!;
    }
  }

  handleKeyPress(e: KeyboardEvent, idx: number) {
    const isDigit = /\d/.test(e.key);
    if (e.key === 'v' && e.metaKey) {
      return true;
    }

    if (isDigit && idx + 1 < this.inputSize) {
      this._scheduledFocus = idx + 1;
    }

    if (isDigit && this.inputs.controls[idx].value) {
      this.inputs.controls[idx].setValue('');
    }

    return isDigit;
  }

  handlePaste(e: ClipboardEvent, idx: number) {
    e.preventDefault();

    if (idx !== 0) {
      return;
    }

    const pasteData = e.clipboardData?.getData('text');
    const regex = new RegExp(`\\d{${this.inputSize}}`);

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

  handleFocus(e: FocusEvent) {
    (e.target as HTMLInputElement).select();
  }

  focusInput(idx: number) {
    setTimeout(() => this.inputEls.get(idx)?.nativeElement.focus());
  }

  updateWiredValue() {
    setTimeout(() => this.onChange?.(this.inputs.value.join('')));
  }


}
