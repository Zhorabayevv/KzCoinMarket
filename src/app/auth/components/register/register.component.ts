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
import { LocalStorageService } from 'src/app/shared/services/localStorageChanged.service';
import { IBackendErrors } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() logIn: boolean;
  @Output() logInChange = new EventEmitter<boolean>();
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<IBackendErrors | null>;
  darkMode: boolean;
  currency: string;

  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private message: NzMessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initionalizeForm();
    this.initioalizeValues();
  }

  initioalizeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
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
