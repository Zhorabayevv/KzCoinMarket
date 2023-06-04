import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import localeKz from '@angular/common/locales/kk';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { NavBarModule } from 'src/app/shared/modules/navBar/navBar.module';
import { Interceptor } from 'src/app/shared/services/interceptor.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { GlobalFeedModule } from 'src/app/globalFeed/globalFeed.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { YourFeedModule } from './yourFeed/yourFeed.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { ArticleModule } from './article/article.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { LocalStorageService } from './shared/services/localStorageChanged.service';
import { PostsModule } from './posts/posts.module';
import { KazakhCoinsModule } from './kazakhCoins/kazakhCoins.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function appInitializerFactory(translate: TranslateService) {
  return () => {
    return firstValueFrom(translate.use('kz'));
  };
}

registerLocaleData(localeEn);
registerLocaleData(localeRu);
registerLocaleData(localeKz);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthModule,
    NzLayoutModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([]),
    NavBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    GlobalFeedModule,
    StoreRouterConnectingModule.forRoot(),
    YourFeedModule,
    FooterModule,
    PortfolioModule,
    ArticleModule,
    HttpClientModule,
  PostsModule,
    KazakhCoinsModule
  ],
  exports: [TranslateModule],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    },
    LocalStorageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
