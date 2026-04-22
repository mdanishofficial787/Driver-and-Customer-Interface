import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customer-signup-step2',
  templateUrl: './signup-step2.page.html',
  styleUrls: ['./signup-step2.page.scss'],
})
export class CustomerSignupStep2Page implements OnInit {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submitRegistration() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      localStorage.setItem('customerStep2', JSON.stringify(this.signupForm.value));
      const toast = await this.toastController.create({
        message: 'Registration complete. Welcome!',
        duration: 5000,
        position: 'top',
        color: 'success',
        icon: 'checkmark-circle-outline'
      });
      await toast.present();
      await toast.onDidDismiss();
      this.router.navigate(['/customer/home']);
    } else {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        const a = await this.alertController.create({ header: 'Error', message: 'Passwords do not match', buttons: ['OK'] });
        await a.present();
      }
    }
  }

  onFieldInput(fieldName: string, event: any) {
    // Update form control silently (emitEvent: false prevents cursor jumping)
    this.signupForm.get(fieldName)?.setValue(event.target.value, { emitEvent: false });
  }

  togglePassword(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
