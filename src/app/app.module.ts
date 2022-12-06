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
import { ProfileComponent } from './pages/profile/profile.component';
import { TweetCreateComponent } from './components/tweet/tweet-create/tweet-create.component';
import { AdsStatisticsComponent } from './pages/ads-statistics/ads-statistics.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsernameValidatorComponent } from './components/validators/username-validator/username-validator.component';
import { PasswordValidatorComponent } from './components/validators/password-validator/password-validator.component';
import { EmailValidatorComponent } from './components/validators/email-validator/email-validator.component';
import { AgeValidatorComponent } from './components/validators/age-validator/age-validator.component';
import { TokenInterceptorService } from './services/security/token-interceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { JwtUtilsService } from './services/security/jwt-utils.service';
import { CanActivateAuthGuard } from './services/security/can-activate-auth.guard';
import { AuthenticationService } from './services/security/authentication.service';
import { TweetsComponent } from './components/tweet/tweets/tweets.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxCaptchaModule } from 'ngx-captcha';
import { VerificationComponent } from './components/verification/verification.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { FollowRequestsComponent } from './pages/follow-requests/follow-requests.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { RegularUserRegisterFormComponent } from './components/register-form/regular-user-register-form/regular-user-register-form.component';
import { BusinessUserRegisterFormComponent } from './components/register-form/business-user-register-form/business-user-register-form.component';
import { UsersListModalComponent } from './components/modals/users-list-modal/users-list-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FollowRecommendationsComponent } from './components/follow-recommendations/follow-recommendations.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    TweetItemComponent,
    TweetActionsComponent,
    NavbarComponent,
    ProfileComponent,
    TweetCreateComponent,
    AdsStatisticsComponent,
    ProfileSettingsComponent,
    RegisterComponent,
    LoginComponent,
    RegularUserRegisterFormComponent,
    BusinessUserRegisterFormComponent,
    UsernameValidatorComponent,
    PasswordValidatorComponent,
    EmailValidatorComponent,
    AgeValidatorComponent,
    TweetsComponent,
    VerificationComponent,
    ForgotPasswordComponent,
    FollowRequestsComponent,
    RecoverAccountComponent,
    NewPasswordComponent,
    UsersListModalComponent,
    SidebarComponent,
    FollowRecommendationsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AppRoutingModule,
    InfiniteScrollModule
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
