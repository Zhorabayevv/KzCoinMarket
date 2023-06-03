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

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() sign: string;

  form: FormGroup;
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
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initionalizeForm();
    this.initionalizeValues();
    if (this.sign === 'up') {
      this.logIn = false;
    }
    console.log(this.sign);
  }

  initionalizeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLogged$ = this.store.pipe(select(isLoggedInSelector));
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
      this.message.success('You are logged in');
    }
  }

  changeLogIn(logIn): void {
    this.logIn = true;
  }

  changeSignUp(logIn): void {
    this.logIn = false;
  }
}
