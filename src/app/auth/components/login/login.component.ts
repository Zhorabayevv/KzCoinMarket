import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { isSubmittingSelector, validationErrorsSelector } from 'src/app/auth/store/selectors';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';
import { ILoginRequest } from 'src/app/auth/types/loginRequest.interface';
import { loginAction } from 'src/app/auth/store/actions/login.action';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initionalizeForm();
    this.initioalizeValues();
  }

  initioalizeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    console.log(this.isSubmitting$);
  }
  initionalizeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    console.log(this.form.value);
    const request: ILoginRequest = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}));
  }
}
