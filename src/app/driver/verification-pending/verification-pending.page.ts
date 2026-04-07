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

    // Image validation: Check if file is actually a valid image and meets document type requirements
    if (file.type.startsWith('image/')) {
      const imageValidation = await this.validateImageFile(file, field);
      if (!imageValidation.valid) {
        const alert = await this.alertController.create({
          header: 'Invalid Image',
          message: imageValidation.message ?? 'File appears to be corrupted or not a valid image. Please upload a clear photo of the correct document or vehicle photo.',
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

  private isCardDocumentField(field: string): boolean {
    return [
      'cnicFront',
      'cnicBack',
      'drivingLicenseFront',
      'drivingLicenseBack',
      'smartCardFront',
      'smartCardBack'
    ].includes(field);
  }

  private isPaperDocumentField(field: string): boolean {
    return ['vehicleDocuments'].includes(field);
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

          if (this.isCardDocumentField(field) || this.isPaperDocumentField(field)) {
            const analysis = this.analyzeDocumentImage(img, field);
            if (!analysis.valid) {
              return resolve({ valid: false, message: analysis.message });
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

  private analyzeDocumentImage(img: HTMLImageElement, field: string): { valid: boolean; message?: string } {
    const canvas = document.createElement('canvas');
    const maxDim = 250;
    const ratio = Math.min(maxDim / img.width, maxDim / img.height, 1);
    canvas.width = Math.round(img.width * ratio);
    canvas.height = Math.round(img.height * ratio);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { valid: true };
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { uniqueColors, edgeDensity, avgSaturation } = this.computeImageMetrics(imageData);
    const ratioWH = img.width / img.height;

    if (this.isCardDocumentField(field)) {
      if (ratioWH < 1.2 || ratioWH > 2.4) {
        return {
          valid: false,
          message: 'Please upload a card-style document photo in landscape orientation.'
        };
      }

      if (uniqueColors > 100) {
        return {
          valid: false,
          message: 'This image is too colorful for a card document. Please upload the actual document only.'
        };
      }

      if (avgSaturation > 0.32) {
        return {
          valid: false,
          message: 'This image appears too colorful. Please upload a clear scan/photo of the actual document.'
        };
      }

      if (edgeDensity < 0.05) {
        return {
          valid: false,
          message: 'This image does not contain enough document detail. Please upload a clearer document photo.'
        };
      }

      if (edgeDensity > 0.42) {
        return {
          valid: false,
          message: 'This image is too complex for a document photo. Please upload only the actual document.'
        };
      }
    }

    if (this.isPaperDocumentField(field)) {
      if (avgSaturation > 0.4 && uniqueColors > 140) {
        return {
          valid: false,
          message: 'Vehicle document photo should look like a document scan, not a regular photo.'
        };
      }

      if (edgeDensity < 0.04) {
        return {
          valid: false,
          message: 'This image does not have enough document-like detail. Please upload a clear vehicle registration document.'
        };
      }
    }

    return { valid: true };
  }

  private computeImageMetrics(imageData: ImageData): { uniqueColors: number; edgeDensity: number; avgSaturation: number } {
    const { data, width, height } = imageData;
    const colors = new Set<number>();
    let edgeCount = 0;
    let sampleCount = 0;
    let saturationSum = 0;

    for (let y = 0; y < height - 1; y += 2) {
      for (let x = 0; x < width - 1; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
        colors.add(key);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const lightness = (max + min) / 2;
        let saturation = 0;
        if (max !== min) {
          saturation = lightness <= 127
            ? (max - min) / (max + min)
            : (max - min) / (510 - max - min);
        }
        saturationSum += saturation;

        const rightIdx = idx + 4;
        const downIdx = idx + width * 4;
        const dr = Math.abs(r - data[rightIdx]);
        const dg = Math.abs(g - data[rightIdx + 1]);
        const db = Math.abs(b - data[rightIdx + 2]);
        const downDr = Math.abs(r - data[downIdx]);
        const downDg = Math.abs(g - data[downIdx + 1]);
        const downDb = Math.abs(b - data[downIdx + 2]);
        const horiz = Math.sqrt(dr * dr + dg * dg + db * db);
        const vert = Math.sqrt(downDr * downDr + downDg * downDg + downDb * downDb);

        if (horiz > 28 || vert > 28) {
          edgeCount++;
        }
        sampleCount++;
      }
    }

    return {
      uniqueColors: colors.size,
      edgeDensity: sampleCount ? edgeCount / sampleCount : 0,
      avgSaturation: sampleCount ? saturationSum / sampleCount : 0
    };
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
