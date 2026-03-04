import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-monthly-pickup',
  templateUrl: './monthly-pickup.page.html',
  styleUrls: ['./monthly-pickup.page.scss'],
})
export class MonthlyPickupPage {
  pickupLocation = '';
  dropLocation = '';
  monthlySchedule = '';
  submitted = false;

  constructor(private alertController: AlertController) {}

  async submitRequest() {
    if (!this.pickupLocation || !this.dropLocation) {
      const a = await this.alertController.create({ header: 'Missing fields', message: 'Please enter pickup and drop locations.', buttons: ['OK'] });
      await a.present();
      return;
    }

    const request = {
      pickupLocation: this.pickupLocation,
      dropLocation: this.dropLocation,
      monthlySchedule: this.monthlySchedule,
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };
    // persist locally for now
    localStorage.setItem('monthlyPickupRequest', JSON.stringify(request));
    this.submitted = true;
    const a = await this.alertController.create({ header: 'Request Submitted', message: 'Your monthly pickup request has been submitted. Waiting for Admin.', buttons: ['OK'] });
    await a.present();
  }
}
