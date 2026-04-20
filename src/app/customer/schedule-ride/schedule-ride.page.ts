import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule-ride',
  templateUrl: './schedule-ride.page.html',
  styleUrls: ['./schedule-ride.page.scss'],
})
export class ScheduleRidePage {
  requiredDates = '';
  pickupLocation = '';
  dropLocation = '';
  rating = 'Standard';
  selectedVehicle = 'sedan';
  customerName = localStorage.getItem('customerName') || 'Guest';
  submitted = false;

  constructor(private alertController: AlertController) {}

  selectVehicle(vehicle: string) {
    this.selectedVehicle = vehicle;
  }

  async requestDriver() {
    if (!this.requiredDates || !this.pickupLocation || !this.dropLocation) {
      const a = await this.alertController.create({ header: 'Missing fields', message: 'Please fill required dates, pickup and drop locations.', buttons: ['OK'] });
      await a.present();
      return;
    }

    const request = {
      requiredDates: this.requiredDates,
      pickupLocation: this.pickupLocation,
      dropLocation: this.dropLocation,
      rating: this.rating,
      vehicleType: this.selectedVehicle,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('scheduleRideRequest', JSON.stringify(request));
    this.submitted = true;
    const a = await this.alertController.create({ header: 'Request Submitted', message: 'Admin matching in progress. A driver will be assigned shortly.', buttons: ['OK'] });
    await a.present();
  }
}
