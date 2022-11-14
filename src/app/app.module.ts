import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TweetItemComponent } from './components/tweet/tweet-item/tweet-item.component';
import { TweetActionsComponent } from './components/tweet/tweet-actions/tweet-actions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TweetCreateComponent } from './components/tweet/tweet-create/tweet-create.component';
import { CommentItemComponent } from './components/comment/comment-item/comment-item.component';
import { PostInfoHeaderComponent } from './components/post-info-header/post-info-header.component';
import { AdsStatisticsComponent } from './pages/ads-statistics/ads-statistics.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegularUserRegisterFormComponent } from './components/regular-user-register-form/regular-user-register-form.component';
import { BusinessUserRegisterFormComponent } from './components/business-user-register-form/business-user-register-form.component';
import { UsernameValidatorComponent } from './components/validators/username-validator/username-validator.component';
import { PasswordValidatorComponent } from './components/validators/password-validator/password-validator.component';
import { EmailValidatorComponent } from './components/validators/email-validator/email-validator.component';
import { AgeValidatorComponent } from './components/validators/age-validator/age-validator.component';
import { TokenInterceptorService } from './security/token-interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { JwtUtilsService } from './security/jwt-utils.service';
import { CanActivateAuthGuard } from './security/can-activate-auth.guard';
import { AuthenticationService } from './security/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    TweetItemComponent,
    TweetActionsComponent,
    NavbarComponent,
    SearchComponent,
    ProfileComponent,
    TweetCreateComponent,
    CommentItemComponent,
    PostInfoHeaderComponent,
    AdsStatisticsComponent,
    ProfileSettingsComponent,
    RegisterComponent,
    LoginComponent,
    RegularUserRegisterFormComponent,
    BusinessUserRegisterFormComponent,
    UsernameValidatorComponent,
    PasswordValidatorComponent,
    EmailValidatorComponent,
    AgeValidatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthenticationService,
    CanActivateAuthGuard,
    JwtUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
