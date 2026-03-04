import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customer-signup-step2',
  templateUrl: './signup-step2.page.html',
  styleUrls: ['./signup-step2.page.scss'],
})
export class CustomerSignupStep2Page implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.signupForm = this.formBuilder.group({
      accountType: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submitRegistration() {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      localStorage.setItem('customerStep2', JSON.stringify(this.signupForm.value));
      const alert = await this.alertController.create({
        header: 'Success!',
        message: 'Registration complete. Welcome!',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigate(['/customer/home']);
          }
        }]
      });
      await alert.present();
    } else {
      if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
        const a = await this.alertController.create({ header: 'Error', message: 'Passwords do not match', buttons: ['OK'] });
        await a.present();
      }
    }
  }
}
