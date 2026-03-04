import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customer-location-setup',
  templateUrl: './location-setup.page.html',
  styleUrls: ['./location-setup.page.scss'],
})
export class CustomerLocationSetupPage implements OnInit {
  locationForm: FormGroup;
  gpsEnabled = false;
  currentLocation = { latitude: 0, longitude: 0, address: '' };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.locationForm = this.formBuilder.group({
      preferredRoute: ['', Validators.required],
      preferredTiming: ['', Validators.required],
      manualAddress: ['']
    });
  }

  ngOnInit() {}

  async enableGPS() {
    const loading = await this.loadingController.create({ message: 'Getting your location...' });
    await loading.present();

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.currentLocation.latitude = position.coords.latitude;
        this.currentLocation.longitude = position.coords.longitude;
        this.currentLocation.address = 'Current Location: ' + position.coords.latitude.toFixed(4) + ', ' + position.coords.longitude.toFixed(4);
        this.gpsEnabled = true;
        await loading.dismiss();
        const alert = await this.alertController.create({ header: 'GPS Enabled', message: 'Your location has been detected successfully!', buttons: ['OK'] });
        await alert.present();
      }, async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({ header: 'GPS Error', message: 'Could not get your location. Please enable GPS or enter manually.', buttons: ['OK'] });
        await alert.present();
      });
    } else {
      await loading.dismiss();
      const alert = await this.alertController.create({ header: 'Not Supported', message: 'GPS is not supported on this device.', buttons: ['OK'] });
      await alert.present();
    }
  }

  async saveLocation() {
    if (this.locationForm.valid && (this.gpsEnabled || this.locationForm.value.manualAddress)) {
      const loading = await this.loadingController.create({ message: 'Saving location...' });
      await loading.present();
      setTimeout(async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({ header: 'Success!', message: 'Location and preferences saved successfully!', buttons: [{ text: 'Continue', handler: () => { this.router.navigate(['/customer/home']); } }] });
        await alert.present();
      }, 1500);
    } else {
      const alert = await this.alertController.create({ header: 'Incomplete', message: 'Please enable GPS or enter manual address, and fill all required fields.', buttons: ['OK'] });
      await alert.present();
    }
  }
}
