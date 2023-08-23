import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multistep-step',
  templateUrl: './multistep-step.component.html',
  styleUrls: ['./multistep-step.component.css']
})
export class MultistepStepComponent {
  @Input() stepData!: FormGroup;
  @Input() formStep!: number; // Pass the formStep value from the parent
  @Input() stepIndex!: number;
  @Input() steps!: any[]; // Pass the steps array from the parent

  constructor() { }

  get controlNames(): string[] {
    return Object.keys(this.stepData.controls);
  }


  previousStep(): void {
    // Previous step logic here
  }

  nextStep(): void {
    // Next step logic here
  }

  getControlLabel(controlName: string): string {
    // You can implement a function to return control label based on controlName
    return '';
  }

  getControlPlaceholder(controlName: string): string {
    // You can implement a function to return control placeholder based on controlName
    return '';
  }
}
