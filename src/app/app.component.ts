import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { getCurrentUserAction } from 'src/app/auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (localStorage.getItem('darkMode') === 'true') {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
    this.store.dispatch(getCurrentUserAction());
  }

  changeTheme(mode: boolean): void {
    this.darkMode = mode;
    localStorage.setItem('darkMode', mode.toString());
  }
}
