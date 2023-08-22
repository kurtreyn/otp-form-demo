import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultistepFormService {
  private stepSource = new BehaviorSubject<string>('2');
  step = this.stepSource.asObservable();


  constructor() { }

  setStep(step: string): void {
    this.stepSource.next(step);
  }

  getStep(): string {
    return this.stepSource.getValue();
  }
}
