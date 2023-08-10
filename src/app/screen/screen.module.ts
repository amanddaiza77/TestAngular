import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { InputDetailComponent } from './input-detail/input-detail.component';
import { ConfirmReviewComponent } from './confirm-review/confirm-review.component';
import { ScreenRoutingModule } from './screen-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [InputDetailComponent, ConfirmReviewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ScreenRoutingModule,
    CommonModule,
    BrowserModule 
  ],
  providers: [
    DatePipe
  ],
  exports: [InputDetailComponent, ConfirmReviewComponent]
})
export class ScreenModule { }
