import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verification-pending',
  templateUrl: './verification-pending.page.html',
  styleUrls: ['./verification-pending.page.scss'],
})
export class VerificationPendingPage implements OnInit {
  verificationStatus: 'not_submitted'|'pending'|'approved'|'rejected' = 'not_submitted';

  // Files to be uploaded
  cnicFront?: File;
  cnicBack?: File;
  vehicleDocuments?: File;
  drivingLicenseFront?: File;
  drivingLicenseBack?: File;
  smartCardFront?: File;
  smartCardBack?: File;
  driverPicture?: File;
  carFront?: File;
  carBack?: File;
  carLeft?: File;
  carRight?: File;

  constructor(
    public router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  checkVerificationStatus() {
    // TODO: Replace with actual API call when backend is ready
  }

  async refreshStatus() {
    // TODO: Call API to check status
    const alert = await this.alertController.create({
      header: 'Status Check',
      message: 'Your verification is still pending. Admin will review your documents soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    switch (field) {
      case 'cnicFront': this.cnicFront = file; break;
      case 'cnicBack': this.cnicBack = file; break;
      case 'drivingLicenseFront': this.drivingLicenseFront = file; break;
      case 'drivingLicenseBack': this.drivingLicenseBack = file; break;
      case 'vehicleDocuments': this.vehicleDocuments = file; break;
      case 'smartCardFront': this.smartCardFront = file; break;
      case 'smartCardBack': this.smartCardBack = file; break;
      case 'driverPicture': this.driverPicture = file; break;
      case 'carFront': this.carFront = file; break;
      case 'carBack': this.carBack = file; break;
      case 'carLeft': this.carLeft = file; break;
      case 'carRight': this.carRight = file; break;
    }
  }

  async submitDocuments() {
    // Basic client-side validation
    if (!this.cnicFront || !this.cnicBack || !this.drivingLicenseFront || !this.drivingLicenseBack || !this.vehicleDocuments || !this.smartCardFront || !this.smartCardBack || !this.driverPicture || !this.carFront || !this.carBack || !this.carLeft || !this.carRight) {
      const alert = await this.alertController.create({
        header: 'Missing files',
        message: 'Please upload all required documents before submitting.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // TODO: Upload files to backend here. For now simulate submission and set status to pending
    this.verificationStatus = 'pending';
    const alert = await this.alertController.create({
      header: 'Submitted',
      message: 'Documents submitted successfully. Your verification status is now pending.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToDriverHome() {
    // Navigate to location setup after approval
    this.router.navigate(['/driver/location-setup']);
  }
}
