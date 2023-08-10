import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { taxData } from 'src/app/core/models/input.models';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css']
})
export class InputDetailComponent implements OnInit {
  @ViewChild('invalidTaxModal') invalidTaxModal!: ElementRef;
  months = [
    { id: 1, nameMounth: 'January' },
    { id: 2, nameMounth: 'February' },
    { id: 3, nameMounth: 'March' },
    { id: 4, nameMounth: 'April' },
    { id: 5, nameMounth: 'May' },
    { id: 6, nameMounth: 'June' },
    { id: 7, nameMounth: 'July' },
    { id: 8, nameMounth: 'August' },
    { id: 9, nameMounth: 'September' },
    { id: 10, nameMounth: 'October' },
    { id: 11, nameMounth: 'November' },
    { id: 12, nameMounth: 'December' },
  ]
  taxData!: taxData;
  numericValue: string = '';
  formattedTaxAmount: string = '';
  formattedSaleAmount: string = '';
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  yearOptions: number[] = [];
  myForm: FormGroup;
  stepsPassed: number[] = [];
  currentStep = 1;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      filingType: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required]),
      year: ['', [Validators.required]],
      saleAmount: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      taxAmount: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      surcharge: [''],
      penalty: ['200.00'],
      totalAmount: [''],
    });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      filingType: ['0'],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      saleAmount: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      taxAmount: [null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      surcharge: [''],
      penalty: [''],
      totalAmount: [''],
    });
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    for (let year = startYear; year <= currentYear; year++) {
      this.yearOptions.push(year);
    }
  }
  isMonthDisabled(monthId: number): boolean {
    return monthId > this.currentMonth;
  }
  updateField() {
    if (this.myForm) {
      const penaltyControl = this.myForm.get('penalty');
      if (penaltyControl) {
        if (this.myForm.value.filingType === '1') {
          penaltyControl.setValue('200.00');
        } else {
          penaltyControl.setValue('0.00');
        }
      }
    }
    this.myForm.patchValue({
      surcharge: 0,
      totalAmount: 0
    });

    this.myForm.value.surcharge = 0;
    this.myForm.value.totalAmount = 0;
  }
  calculateSurcharge() {
    const taxAmount = this.myForm.value.taxAmount;
    const surchargeValue = parseFloat((taxAmount * 0.1).toFixed(2));
    this.myForm.patchValue({ surcharge: surchargeValue });
    this.calculateTotalAmount()
  }
  calculateTotalAmount() {
    var num1 = 8618.61;
    var num2 = 861.86;

    var sum = num1 + num2;
    this.myForm.value.totalAmount = (Number(this.myForm.value.taxAmount) + Number(this.myForm.value.surcharge) + Number(this.myForm.value.penalty)).toFixed(2)
  }
  calculateTax() {
    const saleAmountControl = this.myForm.get('saleAmount');
    const taxAmountControl = this.myForm.get('taxAmount');
    if (saleAmountControl && taxAmountControl) {
      const saleAmount = saleAmountControl.value;
      const taxValue = saleAmount * 0.07;
      taxAmountControl.setValue(taxValue.toFixed(2));

      const formattedTaxValue = taxAmountControl.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.formattedTaxAmount = formattedTaxValue;

      if (this.myForm.value.filingType === '1') {
        this.calculateSurcharge();
      } else {
        this.calculateTotalAmount();
      }
    }

  }
  displayRawTaxValue() {
    const taxAmountControl = this.myForm.get('taxAmount');
    const saleAmountControl = this.myForm.get('saleAmount');
    if (taxAmountControl) {
      this.formattedTaxAmount = taxAmountControl.value;
    }
    if (saleAmountControl) {
      this.formattedSaleAmount = saleAmountControl.value;
    }
  }

  formatAndDisplayTaxValue() {
    const taxAmountControl = this.myForm.get('taxAmount');
    const saleAmountControl = this.myForm.get('saleAmount');
    if (taxAmountControl && taxAmountControl.value > 999) {
      const formattedTaxValue = taxAmountControl.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.formattedTaxAmount = formattedTaxValue;
    }
    if (saleAmountControl && saleAmountControl.value > 999) {
      const formattedSaleValue = saleAmountControl.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.formattedSaleAmount = formattedSaleValue;
    }
    if (saleAmountControl && taxAmountControl && taxAmountControl.value <= (saleAmountControl.value * .07) - 20 ||
      saleAmountControl && taxAmountControl && taxAmountControl.value >= (saleAmountControl.value * .07) + 20) {
      this.calculateTax()
      alert('Error: Conditions not met.');
    }
  }
  validateTaxAmount(control: AbstractControl): ValidationErrors | null {
    const taxValue = parseFloat(control.value || '0');
    const saleAmount = this.myForm.get('saleAmount')?.value;

    if (Math.abs(taxValue - (saleAmount * 0.07)) < 20) {
      return { invalidTax: true };
    }
    return null;
  }
  openInvalidTaxModal() {
    const modalElement: any = this.invalidTaxModal.nativeElement;
    modalElement.show();
  }
  onInput(event: Event) {
    if (event?.target instanceof HTMLInputElement) {
      if (event?.target?.id === 'saleAmount') {
        this.myForm.value.saleAmount = this.myForm.value.saleAmount.replace(/[^0-9.]/g, '');
        this.calculateTax()
      }
      if (event?.target?.id === 'taxAmount') {
        this.myForm.value.taxAmount = this.myForm.value.taxAmount.replace(/[^0-9.]/g, '');
      }
    }
  }
  myTextFilling(idType?: String) {
    if (idType === '0') {
      return 'Ordinary Filing'
    } else if (idType === '1') {
      return 'Additional Filing'
    } else {
      return ''
    }
  }
  myTextMY(idMtoY?: String) {
    const textShow = this.months.find((value: any) => {
      if (value.id === Number(idMtoY)) {
        return value.nameMounth
      }
    })
    return textShow?.nameMounth
  }
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (
      allowedKeys.indexOf(event.key) === -1 &&
      (isNaN(Number(event.key)) && event.key !== '.')
    ) {
      event.preventDefault();
    }
  }
  nextStep() {
    this.taxData = this.myForm.value

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

  formatCurrency(value: number): string {
    return value?.toLocaleString('en-US', { style: 'currency', currency: 'THB' }) || '';
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.nextStep()
    } else {
      this.validateAllFormFields(this.myForm);
      alert('Please fix validation errors before submitting.');
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
