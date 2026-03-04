import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SelectUserTypePage } from './select-user-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SelectUserTypePage }])
  ],
  declarations: [SelectUserTypePage]
})
export class SelectUserTypePageModule {}
