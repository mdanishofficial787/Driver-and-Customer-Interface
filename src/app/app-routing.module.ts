import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'select-user-type',
    loadChildren: () => import('./select-user-type/select-user-type.module').then(m => m.SelectUserTypePageModule)
  },
  // Driver Routes - ALL COMPLETED ✅
  {
    path: 'driver/signup-step1',
    loadChildren: () => import('./driver/signup-step1/signup-step1.module').then(m => m.SignupStep1PageModule)
  },
  {
    path: 'driver/signup-step2',
    loadChildren: () => import('./driver/signup-step2/signup-step2.module').then(m => m.SignupStep2PageModule)
  },
  {
    path: 'driver/verification-pending',
    loadChildren: () => import('./driver/verification-pending/verification-pending.module').then(m => m.VerificationPendingPageModule)
  },
  {
    path: 'driver/location-setup',
    loadChildren: () => import('./driver/location-setup/location-setup.module').then(m => m.LocationSetupPageModule)
  },
  {
    path: 'driver/home',
    loadChildren: () => import('./driver/home/home.module').then(m => m.DriverHomePageModule)
  },
  
  // Customer Routes - implemented to mirror driver
  {
    path: 'customer/signup-step1',
    loadChildren: () => import('./customer/signup-step1/signup-step1.module').then(m => m.CustomerSignupStep1PageModule)
  },
  {
    path: 'customer/signup-step2',
    loadChildren: () => import('./customer/signup-step2/signup-step2.module').then(m => m.CustomerSignupStep2PageModule)
  },
  {
    path: 'customer/monthly-pickup',
    loadChildren: () => import('./customer/monthly-pickup/monthly-pickup.module').then(m => m.MonthlyPickupPageModule)
  },
  {
    path: 'customer/schedule-ride',
    loadChildren: () => import('./customer/schedule-ride/schedule-ride.module').then(m => m.ScheduleRidePageModule)
  },
  {
    path: 'customer/hire-driver',
    loadChildren: () => import('./customer/hire-driver/hire-driver.module').then(m => m.HireDriverPageModule)
  },
  {
    path: 'customer/travel-tourism',
    loadChildren: () => import('./customer/travel-tourism/travel-tourism.module').then(m => m.TravelTourismPageModule)
  },
  {
    path: 'customer/location-setup',
    loadChildren: () => import('./customer/location-setup/location-setup.module').then(m => m.CustomerLocationSetupPageModule)
  },
  {
    path: 'customer/home',
    loadChildren: () => import('./customer/home/home.module').then(m => m.CustomerHomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
