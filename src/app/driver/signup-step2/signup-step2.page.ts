import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup-step2',
  templateUrl: './signup-step2.page.html',
  styleUrls: ['./signup-step2.page.scss'],
})
export class SignupStep2Page implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.signupForm = this.formBuilder.group({
      vehicleType: ['', Validators.required],
      vehicleRegistration: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)[A-Za-z0-9\- ]{5,15}$/)
      ]],
      licenseNumber: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)[A-Za-z0-9\-]{6,20}$/)
      ]],
      smartCardNumber: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)[A-Za-z0-9]{6,20}$/)
      ]]
    });
  }

  ngOnInit() {}

  async submitRegistration() {
    if (this.signupForm.valid) {
      // Save step2 data to localStorage
      localStorage.setItem('driverStep2', JSON.stringify(this.signupForm.value));
      
      const alert = await this.alertController.create({
        header: 'Success!',
        message: 'Your registration has been submitted for admin approval.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/driver/verification-pending']);
          }
        }]
      });
      await alert.present();
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }
}
