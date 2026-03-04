import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CustomerLocationSetupPage } from './location-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: CustomerLocationSetupPage }])
  ],
  declarations: [CustomerLocationSetupPage]
})
export class CustomerLocationSetupPageModule {}
