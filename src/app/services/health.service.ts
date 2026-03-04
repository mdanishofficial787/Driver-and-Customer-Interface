import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, of } from 'rxjs';
import { catchError, switchMap, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HealthService {
  public online$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // poll health endpoint every 10 seconds
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.checkOnce())
      )
      .subscribe((ok) => this.online$.next(ok));
  }

  checkOnce() {
    const base = (environment.baseUrl || '').replace(/\/+$/, '');
    if (!base) return of(false);
    return this.http.get(`${base}/api/health`).pipe(
      catchError(() => of(null)),
      switchMap((res) => of(!!res))
    );
  }
}
