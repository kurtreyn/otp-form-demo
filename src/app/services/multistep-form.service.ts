import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultistepFormService {
  private stepSource = new BehaviorSubject<string>('3');
  private successStatus = new BehaviorSubject<boolean>(false);
  step = this.stepSource.asObservable();
  status = this.successStatus.asObservable();


  constructor() { }

  setStep(step: string): void {
    this.stepSource.next(step);
  }

  getStep(): string {
    return this.stepSource.getValue();
  }

  setStatus(status: boolean): void {
    this.successStatus.next(status);
  }

  getStatus(): boolean {
    return this.successStatus.getValue();
  }
}
