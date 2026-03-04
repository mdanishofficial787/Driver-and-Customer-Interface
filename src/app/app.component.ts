import { Component, OnDestroy } from '@angular/core';
import { HealthService } from './services/health.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  online = false;
  sub: Subscription;

  constructor(private health: HealthService) {
    this.sub = this.health.online$.subscribe((ok) => (this.online = ok));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
