import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from 'src/app/layout/main-layout/main-layout.component';
import { ConfirmReviewComponent } from './confirm-review/confirm-review.component';
import { InputDetailComponent } from './input-detail/input-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: InputDetailComponent },
            { path: 'review', component: ConfirmReviewComponent },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule, ReactiveFormsModule,
    ],
    exports: [RouterModule]
})

export class ScreenRoutingModule { }
