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

    // File size validation: Max 5MB
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      const alert = await this.alertController.create({
        header: 'File Too Large',
        message: 'File size must be less than 5MB',
        buttons: ['OK']
      });
      await alert.present();
      input.value = '';
      return;
    }

    // Image validation: Check if file is actually a valid image and meets document requirements
    if (file.type.startsWith('image/')) {
      const imageValidation = await this.validateImageFile(file, field);
      if (!imageValidation.valid) {
        const alert = await this.alertController.create({
          header: 'Invalid Image',
          message: imageValidation.message ?? 'File appears to be corrupted or not a valid image. Please upload a clear photo.',
          buttons: ['OK']
        });
        await alert.present();
        input.value = '';
        return;
      }
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

  private isStrictDocumentField(field: string): boolean {
    return [
      'cnicFront',
      'cnicBack',
      'drivingLicenseFront',
      'drivingLicenseBack',
      'smartCardFront',
      'smartCardBack',
      'vehicleDocuments'
    ].includes(field);
  }

  private validateImageFile(file: File, field: string): Promise<{ valid: boolean; message?: string }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          if (!width || !height) {
            return resolve({ valid: false, message: 'File appears to be corrupted or not a valid image.' });
          }

          if (this.isStrictDocumentField(field)) {
            const ratio = width / height;
            const minSide = Math.min(width, height);
            const maxSide = Math.max(width, height);

            if (minSide < 600 || maxSide < 900) {
              return resolve({
                valid: false,
                message: 'Document image is too small. Please upload a clear, high-resolution scan or photo of the actual document.'
              });
            }

            if (ratio < 1.2 || ratio > 2.4) {
              return resolve({
                valid: false,
                message: 'Please upload a card-style document image (e.g. CNIC, license, smart card) in landscape orientation.'
              });
            }
          }

          resolve({ valid: true });
        };
        img.onerror = () => resolve({ valid: false, message: 'File appears to be corrupted or not a valid image.' });
        img.src = e.target?.result as string;
      };

      reader.onerror = () => resolve({ valid: false, message: 'Unable to read the file. Please upload a valid image.' });
      reader.readAsDataURL(file);
    });
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
