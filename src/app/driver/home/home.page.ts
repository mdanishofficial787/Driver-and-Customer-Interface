import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-driver-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class DriverHomePage implements OnInit {
  isAvailable = false;
  driverName = 'Driver';
  driverEmail = '';
  driverVehicle = '';
  
  assignedRides = [
    {
      id: 'RIDE-001',
      customerName: 'Sara Khan',
      pickupLocation: 'Model Town, Lahore',
      dropLocation: 'DHA Phase 5, Lahore',
      scheduledTime: '09:00 AM',
      fare: 500,
      status: 'pending',
      rideType: 'scheduled',
      paymentDetails: {} as any
    },
    {
      id: 'RIDE-002',
      customerName: 'Ali Ahmed',
      pickupLocation: 'Johar Town, Lahore',
      dropLocation: 'Gulberg III, Lahore',
      scheduledTime: '11:30 AM',
      fare: 350,
      status: 'pending',
      rideType: 'monthly',
      paymentDetails: {} as any
    }
  ];

  stats = {
    totalRides: 2,
    todayRides: 0,
    earnings: 0,
    rating: 4.8
  };

  constructor(private alertController: AlertController, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadDriverData();
  }

  loadDriverData() {
    // Load driver data from localStorage (registered during signup)
    try {
      const step1Data = localStorage.getItem('driverStep1');
      if (step1Data) {
        const driver = JSON.parse(step1Data);
        this.driverName = driver.fullName || 'Driver';
        this.driverEmail = driver.email || '';
      }
      
      const step2Data = localStorage.getItem('driverStep2');
      if (step2Data) {
        const vehicle = JSON.parse(step2Data);
        this.driverVehicle = vehicle.vehicleType || '';
      }
    } catch (error) {
      console.error('Error loading driver data:', error);
    }
  }

  async toggleAvailability(event: any) {
    this.isAvailable = event.detail.checked;
    this.changeDetector.detectChanges();
    
    const alert = await this.alertController.create({
      header: this.isAvailable ? 'You are now Online' : 'You are now Offline',
      message: this.isAvailable 
        ? 'You will receive ride assignments' 
        : 'You will not receive new ride assignments',
      buttons: ['OK']
    });
    await alert.present();
  }

  async acceptRide(ride: any) {
    // Calculate payment breakdown
    const baseFare = ride.fare;
    const platformFee = Math.round(baseFare * 0.10); // 10% commission
    const driverEarnings = baseFare - platformFee;
    
    // Add payment details to ride object
    ride.paymentDetails = {
      baseFare: baseFare,
      platformFee: platformFee,
      driverEarnings: driverEarnings,
      estimatedDistance: 12, // km
      estimatedTime: 25 // minutes
    };
    
    ride.status = 'accepted';
    
    // Update stats
    this.stats.todayRides++;
    this.stats.earnings += driverEarnings;
    
    this.changeDetector.detectChanges();
    this.showSuccessMessage('Ride accepted!');
  }

  async rejectRide(ride: any) {
    const alert = await this.alertController.create({
      header: 'Reject Ride?',
      message: 'Are you sure you want to reject this ride?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Reject',
          handler: () => {
            // If ride was accepted, deduct from stats
            if (ride.status === 'accepted') {
              this.stats.todayRides--;
              this.stats.earnings -= ride.paymentDetails.driverEarnings;
            }
            
            const index = this.assignedRides.indexOf(ride);
            this.assignedRides.splice(index, 1);
            this.changeDetector.detectChanges();
            this.showSuccessMessage('Ride rejected');
          }
        }
      ]
    });
    await alert.present();
  }

  async showSuccessMessage(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
    
    // Auto dismiss after 2 seconds
    setTimeout(() => {
      alert.dismiss();
    }, 2000);
  }

  getRideTypeColor(type: string): string {
    switch(type) {
      case 'scheduled': return 'primary';
      case 'monthly': return 'success';
      case 'hired': return 'warning';
      case 'tourism': return 'tertiary';
      default: return 'medium';
    }
  }
}
