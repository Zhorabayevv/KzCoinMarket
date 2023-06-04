import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  isLoggedInSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/auth/store/selectors';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ILoginRequest } from 'src/app/auth/types/loginRequest.interface';
import { loginAction } from 'src/app/auth/store/actions/login.action';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() sign: string;

  form: FormGroup;
  darkMode: boolean;
  currency: string;
  isSubmitting$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;
  logIn: boolean = true;

  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modal: NzModalRef,
    public translate: TranslateService,
    private message: NzMessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initionalizeForm();
    this.initionalizeValues();
  }

  initionalizeValues(): void {
    if (this.sign === 'up') {
      this.logIn = false;
    }
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLogged$ = this.store.pipe(select(isLoggedInSelector));

    this.localStorageService.getDarkMode().subscribe((value: boolean) => {
      this.darkMode = value;
      console.log(this.darkMode);
    });

    this.localStorageService.getCurrency().subscribe((value: string) => {
      this.currency = value;
    });
  }
  initionalizeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    console.log(this.form.value);
    const request: ILoginRequest = this.form.value;
    this.store.dispatch(loginAction({ request }));
    if (this.isLogged$) {
      this.modal.destroy();
      this.message.success(this.translate.instant('logged_in'));
    }
  }

  changeLogIn(logIn): void {
    this.logIn = true;
  }

  changeSignUp(logIn): void {
    this.logIn = false;
  }
}
