import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultistepFormService {
  private stepSource = new BehaviorSubject<string>('1');
  private successStatus = new BehaviorSubject<string>('');
  step = this.stepSource.asObservable();
  status = this.successStatus.asObservable();


  constructor() { }

  setStep(step: string): void {
    this.stepSource.next(step);
  }

  getStep(): string {
    return this.stepSource.getValue();
  }

  setStatus(status: string): void {
    this.successStatus.next(status);
  }

  getStatus(): string {
    return this.successStatus.getValue();
  }
}
