import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step1',
  templateUrl: './signup-step1.page.html',
  styleUrls: ['./signup-step1.page.scss'],
})
export class SignupStep1Page implements OnInit {
  signupForm: FormGroup;
  isNameFocused = false;
  isCnicFocused = false;
  isMobileFocused = false;
  isEmailFocused = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z]+$/)
      ]],
      cnic: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d{1}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^03\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  nextStep() {
    if (this.signupForm.valid) {
      localStorage.setItem('driverStep1', JSON.stringify(this.signupForm.value));
      this.router.navigate(['/driver/signup-step2']);
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  formatCNIC(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.substring(0, 5) + '-' + value.substring(5);
    if (value.length > 13) value = value.substring(0, 13) + '-' + value.substring(13, 14);
    this.signupForm.patchValue({ cnic: value });
  }
}
