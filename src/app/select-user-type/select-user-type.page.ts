import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user-type',
  templateUrl: './select-user-type.page.html',
  styleUrls: ['./select-user-type.page.scss'],
})
export class SelectUserTypePage {
  constructor(private router: Router) { }

  selectDriver() {
    this.router.navigate(['/driver/signup-step1']);
  }

  selectCustomer() {
    this.router.navigate(['/customer/signup-step1']);
  }
}
