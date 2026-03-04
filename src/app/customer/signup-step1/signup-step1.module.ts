import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CustomerSignupStep1Page } from './signup-step1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: CustomerSignupStep1Page }])
  ],
  declarations: [CustomerSignupStep1Page]
})
export class CustomerSignupStep1PageModule {}
