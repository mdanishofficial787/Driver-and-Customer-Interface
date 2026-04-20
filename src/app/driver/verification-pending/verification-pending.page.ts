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

  async onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    // Validation: File type checking
    const allowedMimeTypes: { [key: string]: string[] } = {
      cnicFront: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      cnicBack: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      drivingLicenseFront: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      drivingLicenseBack: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      vehicleDocuments: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      smartCardFront: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      smartCardBack: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      driverPicture: ['image/jpeg', 'image/png', 'image/webp'],
      carFront: ['image/jpeg', 'image/png', 'image/webp'],
      carBack: ['image/jpeg', 'image/png', 'image/webp'],
      carLeft: ['image/jpeg', 'image/png', 'image/webp'],
      carRight: ['image/jpeg', 'image/png', 'image/webp'],
    };

    // Check file mime type
    const allowedTypes = allowedMimeTypes[field] || [];
    if (!allowedTypes.includes(file.type)) {
      const alert = await this.alertController.create({
        header: 'Invalid File Type',
        message: `Please upload a valid file (${allowedTypes.join(', ')})`,
        buttons: ['OK']
      });
      await alert.present();
      input.value = '';
      return;
    }

    // Assign file to appropriate field
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
    const requiredFiles = [
      this.cnicFront,
      this.cnicBack,
      this.drivingLicenseFront,
      this.drivingLicenseBack,
      this.vehicleDocuments,
      this.smartCardFront,
      this.smartCardBack,
      this.driverPicture,
      this.carFront,
      this.carBack,
      this.carLeft,
      this.carRight,
    ];

    if (requiredFiles.some(file => !file)) {
      const alert = await this.alertController.create({
        header: 'Missing Documents',
        message: 'Please upload all required documents and photos before submitting.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.verificationStatus = 'pending';
    const alert = await this.alertController.create({
      header: 'Submitted',
      message: 'Your documents have been submitted. Admin will review them soon.',
      buttons: ['OK']
    });
    await alert.present();
  }

  goToDriverHome() {
    this.router.navigate(['/driver/home']);
  }
}

