import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './components/verification/verification.component';
import { AdsComponent } from './pages/ads/ads.component';
import { FollowRequestsComponent } from './pages/follow-requests/follow-requests.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoverAccountComponent } from './pages/recover-account/recover-account.component';
import { RegisterComponent } from './pages/register/register.component';
import { BusinessUserCanActivateGuard } from './services/security/business-user-can-activate.guard';
import { CanActivateAuthGuard } from './services/security/can-activate-auth.guard';
import { ShareTweetComponent } from './pages/share-tweet/share-tweet.component';

const routes: Routes = [
  { path: 'share_reddit_redirect', component: ShareTweetComponent, title: 'Twitter Clone | Share on Reddit' },
  { path: 'recover/:recoveryId', component: RecoverAccountComponent, title: 'Twitter Clone | Recover Account' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Twitter Clone | Forgot Password' },
  { path: 'ads', component: AdsComponent, canActivate: [CanActivateAuthGuard, BusinessUserCanActivateGuard] },
  { path: 'profile/follow-requests', component: FollowRequestsComponent, title: 'Twitter Clone | Follow Requests' },
  { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Settings' },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Profile' },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Home' },
  { path: 'verification/:verificationId', component: VerificationComponent },
  { path: 'register', component: RegisterComponent, title: 'Twitter Clone | Register' },
  { path: 'login', component: LoginComponent, title: 'Twitter Clone | Login' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: 'Twitter Clone | Page not found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
