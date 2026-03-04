import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-signup-step1',
  templateUrl: './signup-step1.page.html',
  styleUrls: ['./signup-step1.page.scss'],
})
export class CustomerSignupStep1Page implements OnInit {
  signupForm: FormGroup;
  isNameFocused = false;
  isMobileFocused = false;
  gpsEnabled = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^03\d{9}$/)]],
      currentLocation: [''],
      pickupLocation: ['', Validators.required],
      weeklySchedule: [[]]
    });
  }

  ngOnInit() {}

  nextStep() {
    if (this.signupForm.valid) {
      localStorage.setItem('customerStep1', JSON.stringify(this.signupForm.value));
      this.router.navigate(['/customer/signup-step2']);
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords.latitude.toFixed(6) + ', ' + position.coords.longitude.toFixed(6);
        this.signupForm.patchValue({ currentLocation: coords });
        this.gpsEnabled = true;
      }, (err) => {
        console.error('Geolocation error', err);
        this.gpsEnabled = false;
      });
    }
  }

}