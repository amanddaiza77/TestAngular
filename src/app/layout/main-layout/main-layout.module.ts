import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { ScreenModule } from 'src/app/screen/screen.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    ScreenModule,
    RouterModule.forChild([]),
    BrowserModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  exports: [MainLayoutComponent]
})
export class MainLayoutModule { }
