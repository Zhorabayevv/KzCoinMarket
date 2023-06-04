import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-kazakh-coins',
  templateUrl: './kazakhCoins.component.html',
  styleUrls: ['./kazakhCoins.component.scss'],
})
export class KazakhCoinsComponent implements OnInit {
  darkMode: boolean;
  currency: string;
  apiUrl: string = '/coin/full/kazakh';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }
}
