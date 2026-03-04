import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = (environment.baseUrl || '').replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  // Auth
  selectRole(payload: any) {
    return this.http.post(`${this.base}/api/auth/select-role`, payload);
  }

  signup(payload: any) {
    return this.http.post(`${this.base}/api/auth/signup`, payload);
  }

  verifyOtp(payload: any) {
    return this.http.post(`${this.base}/api/auth/verify-otp`, payload);
  }

  login(payload: any) {
    return this.http.post(`${this.base}/api/auth/login`, payload);
  }

  // Drivers
  getDriverProfile(driverId?: string) {
    const url = driverId ? `${this.base}/api/drivers/profile/${driverId}` : `${this.base}/api/drivers/profile`;
    return this.http.get(url);
  }

  getDriverDocumentStatus() {
    return this.http.get(`${this.base}/api/drivers/profile/document-status`);
  }

  updateDriverProfile(payload: any) {
    return this.http.put(`${this.base}/api/drivers/profile`, payload);
  }

  updateDriverLocation(payload: any) {
    return this.http.post(`${this.base}/api/drivers/location`, payload);
  }

  getDriverAvailability() {
    return this.http.get(`${this.base}/api/drivers/availability`);
  }
}
