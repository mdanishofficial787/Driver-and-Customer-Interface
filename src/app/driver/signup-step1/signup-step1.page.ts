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
        Validators.pattern(/^[A-Za-z\s]+$/)
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

  onFieldInput(fieldName: string, event: any) {
    // Update form control silently (emitEvent: false prevents cursor jumping)
    this.signupForm.get(fieldName)?.setValue(event.target.value, { emitEvent: false });
  }

  formatCNIC(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digits
    let formatted = '';
    
    // Build formatted value: 5-7-1 pattern (XXXXX-XXXXXXX-X)
    for (let i = 0; i < value.length && i < 13; i++) {
      if (i === 5 || i === 12) {
        formatted += '-';
      }
      formatted += value[i];
    }
    
    // Update input value directly without triggering cursor jump
    if (input.value !== formatted) {
      input.value = formatted;
    }
    
    // Update form control silently (emitEvent: false prevents cursor issues)
    this.signupForm.get('cnic')?.setValue(formatted, { emitEvent: false });
  }
}
