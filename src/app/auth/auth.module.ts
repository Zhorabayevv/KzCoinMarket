import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { reducers } from 'src/app/auth/store/reducers';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { GetCurrentUserEffect } from 'src/app/auth/store/effects/getCurrentUser.effect';
import { NgAntModule } from 'src/app/ng-zorro-antd.module';
import { TranslateModule } from '@ngx-translate/core';

// const routes: Routes = [
//   {
//     path: 'register',
//     component: RegisterComponent,
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
// ];

const icons: IconDefinition[] = [SearchOutline];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
    ]),
    BackendErrorMessagesModule,
    NgAntModule,
    FormsModule,
    NzIconModule.forRoot(icons),
    TranslateModule,
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
