import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-hire-driver',
  templateUrl: './hire-driver.page.html',
  styleUrls: ['./hire-driver.page.scss'],
})
export class HireDriverPage {
  cnic = '';
  hiringPersonName = '';
  dateTime = '';
  pickupLocation = '';
  returnTimePlace = '';
  duration = '';
  preferredLocation = '';
  preferredTiming = '';
  submitted = false;

  constructor(private alertController: AlertController) {}

  async submitHire() {
    if (!this.cnic) {
      const a = await this.alertController.create({ header: 'CNIC required', message: 'Customer CNIC is mandatory to hire a driver.', buttons: ['OK'] });
      await a.present();
      return;
    }

    const request = {
      cnic: this.cnic,
      hiringPersonName: this.hiringPersonName,
      dateTime: this.dateTime,
      pickupLocation: this.pickupLocation,
      returnTimePlace: this.returnTimePlace,
      duration: this.duration,
      preferredLocation: this.preferredLocation,
      preferredTiming: this.preferredTiming,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('hireDriverRequest', JSON.stringify(request));
    this.submitted = true;
    const a = await this.alertController.create({ header: 'Submitted', message: 'Verification & Admin Approval in progress.', buttons: ['OK'] });
    await a.present();
  }
}
