import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-confirm-review',
  templateUrl: './confirm-review.component.html',
  styleUrls: ['./confirm-review.component.css']
})
export class ConfirmReviewComponent implements OnInit {
  formData!: FormGroup;
  taxData: any; // Placeholder for tax data model
  constructor() { }

  ngOnInit(): void {
    // Populate taxData with data from Input Detail step
    // this.taxData = {
    //   filingType: 0,
    //   month: 0,
    //   year: 0,
    //   saleAmount: 0,
    //   taxAmount: 0,
    //   surcharge: 0,
    //   penalty: 0,
    //   totalAmount: 0
    // };
  }

  currentStep = 1;

  stepsPassed: number[] = [];

  nextStep() {
    if (this.currentStep < 3) {
      this.stepsPassed.push(this.currentStep);
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepsPassed.pop();
    }
  }

  isStepPassed(step: number): boolean {
    return this.stepsPassed.includes(step);
  }
}
