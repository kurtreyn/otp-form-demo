import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OtpInputService {

  getFormArray(size: number): FormArray {
    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(new FormControl(''));
    }
    return new FormArray(arr);
  }

}
