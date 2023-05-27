import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

import { registerAction } from 'src/app/auth/store/actions/register.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/auth/store/selectors';
import { IRegisterRequest } from 'src/app/auth/types/registerRequest.interface';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;
  @Input() logIn: boolean;
  @Output() logInChange = new EventEmitter<boolean>();

  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private message: NzMessageService
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
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    console.log(this.form.value);
    const request: IRegisterRequest = this.form.value;
    this.store.dispatch(registerAction({ request }));
    this.message.success('You are logged in');
    this.logIn = true;
    this.logInChange.emit(this.logIn);
  }
}
