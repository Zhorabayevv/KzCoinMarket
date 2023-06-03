import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getDarkModeFromLocalStorage());
  private currencySubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrencyFromLocalStorage());

  constructor() {
    interval(1000).subscribe(() => {
      const darkModeValue = this.getDarkModeFromLocalStorage();
      if (darkModeValue !== this.darkModeSubject.getValue()) {
        this.darkModeSubject.next(darkModeValue);
      }

      const currencyValue = this.getCurrencyFromLocalStorage();
      if (currencyValue !== this.currencySubject.getValue()) {
        this.currencySubject.next(currencyValue);
      }
    });
  }

  public setDarkMode(value: boolean): void {
    localStorage.setItem('darkMode', JSON.stringify(value));
  }

  public getDarkMode(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  public setCurrency(value: string): void {
    localStorage.setItem('currency', value);
  }

  public getCurrency(): Observable<string> {
    return this.currencySubject.asObservable();
  }

  private getDarkModeFromLocalStorage(): boolean {
    const darkModeValue = localStorage.getItem('darkMode');
    return darkModeValue !== null ? JSON.parse(darkModeValue) : false;
  }

  private getCurrencyFromLocalStorage(): string {
    const currencyValue = localStorage.getItem('currency');
    return currencyValue !== null ? currencyValue : 'USD';
  }
}
