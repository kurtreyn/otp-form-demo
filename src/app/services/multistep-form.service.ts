import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultistepFormService {
  private stepSource = new BehaviorSubject<number>(1);
  step = this.stepSource.asObservable();


  constructor() { }

  setStep(step: number): void {
    this.stepSource.next(step);
  }

  getStep(): number {
    return this.stepSource.getValue();
  }
}
