import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-monthly-pickup',
  templateUrl: './monthly-pickup.page.html',
  styleUrls: ['./monthly-pickup.page.scss'],
})
export class MonthlyPickupPage {
  requiredDates = '';
  pickupLocation = '';
  dropLocation = '';
  selectedVehicle = 'sedan';
  customerName = localStorage.getItem('customerName') || 'Guest';
  submitted = false;

  constructor(private alertController: AlertController) {}

  selectVehicle(vehicle: string) {
    this.selectedVehicle = vehicle;
  }

  async submitRequest() {
    if (!this.requiredDates || !this.pickupLocation || !this.dropLocation) {
      const a = await this.alertController.create({ header: 'Missing fields', message: 'Please enter date/time, pickup location, and drop location.', buttons: ['OK'] });
      await a.present();
      return;
    }

    const request = {
      requiredDates: this.requiredDates,
      pickupLocation: this.pickupLocation,
      dropLocation: this.dropLocation,
      vehicleType: this.selectedVehicle,
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };
    localStorage.setItem('monthlyPickupRequest', JSON.stringify(request));
    this.submitted = true;
    const a = await this.alertController.create({ header: 'Request Submitted', message: 'Your scheduled pickup request has been submitted. Waiting for Admin.', buttons: ['OK'] });
    await a.present();
  }
}
