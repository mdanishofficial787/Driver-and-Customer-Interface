import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-travel-tourism',
  templateUrl: './travel-tourism.page.html',
  styleUrls: ['./travel-tourism.page.scss'],
})
export class TravelTourismPage {
  cnic = '';
  destination = '';
  travelDates: string | null = null;
  pickupLocation = '';
  returnLocation = '';
  durationDays: number | null = null;
  customerName = localStorage.getItem('customerName') || 'Guest';
  submitted = false;

  constructor(private router: Router, private http: HttpClient) {}

  goBack() {
    this.router.navigate(['/customer/home']);
  }

  submitTravel() {
    if (!this.cnic || this.cnic.trim().length === 0) {
      alert('CNIC is mandatory');
      return;
    }
    const req = {
      cnic: this.cnic,
      destination: this.destination,
      travelDates: this.travelDates,
      pickupLocation: this.pickupLocation,
      returnLocation: this.returnLocation,
      durationDays: this.durationDays,
      createdAt: new Date().toISOString(),
      status: 'Admin Review'
    };
    // If a baseUrl is configured in environment, POST to the API.
    if (environment.baseUrl && environment.baseUrl.length > 0) {
      const url = environment.baseUrl.replace(/\/+$/, '') + '/api/travel-requests';
      this.http.post(url, req).subscribe({
        next: () => { 
          this.submitted = true; 
        },
        error: (err) => {
          console.error('API error saving travel request', err);
          // Silently fall back to localStorage when server is unavailable
          try {
            const saved = localStorage.getItem('travelRequests');
            const arr = saved ? JSON.parse(saved) : [];
            arr.push(req);
            localStorage.setItem('travelRequests', JSON.stringify(arr));
            this.submitted = true;
          } catch (e) {
            console.error('Error saving travel request', e);
            alert('Unable to save request');
          }
        }
      });
    } else {
      // fallback to localStorage when baseUrl is not set
      try {
        const saved = localStorage.getItem('travelRequests');
        const arr = saved ? JSON.parse(saved) : [];
        arr.push(req);
        localStorage.setItem('travelRequests', JSON.stringify(arr));
        this.submitted = true;
      } catch (e) {
        console.error('Error saving travel request', e);
        alert('Unable to save request');
      }
    }
  }
}
