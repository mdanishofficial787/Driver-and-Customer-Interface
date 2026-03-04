import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class CustomerHomePage implements OnInit {
  customerName = 'Customer';
  customerEmail = '';
  assignedBookings: any[] = [];

  stats = { totalRides: 0, todayRides: 0, spending: 0, rating: 0 };

  constructor(private alertController: AlertController, private changeDetector: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.loadCustomerData();
  }

  loadCustomerData() {
    try {
      const step1 = localStorage.getItem('customerStep1');
      if (step1) {
        const c = JSON.parse(step1);
        this.customerName = c.fullName || 'Customer';
        this.customerEmail = c.email || '';
      }
      const step2 = localStorage.getItem('customerStep2');
      if (step2) {
        const a = JSON.parse(step2);
        // use accountType if needed
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
    }
  }

  async contactSupport() {
    const alert = await this.alertController.create({ message: 'Support will contact you soon.', buttons: ['OK'] });
    await alert.present();
  }

  async goMonthlyPickup() {
    await this.tryNavigate('/customer/monthly-pickup');
  }

  async goScheduleRide() {
    await this.tryNavigate('/customer/schedule-ride');
  }

  async goHireDriver() {
    await this.tryNavigate('/customer/hire-driver');
  }

  async goTravel() {
    await this.tryNavigate('/customer/travel-tourism');
  }

  private async tryNavigate(path: string) {
    try {
      await this.router.navigate([path]);
    } catch (e) {
      const alert = await this.alertController.create({ header: 'Not implemented', message: 'This page is not available yet.', buttons: ['OK'] });
      await alert.present();
    }
  }
}
