import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MonthlyPickupPage } from './monthly-pickup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MonthlyPickupPage }])
  ],
  declarations: [MonthlyPickupPage]
})
export class MonthlyPickupPageModule {}
