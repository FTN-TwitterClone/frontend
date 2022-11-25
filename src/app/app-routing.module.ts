import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './components/verification/verification.component';
import { AdsStatisticsComponent } from './pages/ads-statistics/ads-statistics.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { CanActivateAuthGuard } from './services/security/can-activate-auth.guard';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Twitter Clone | Forgot Password' },
  { path: 'ads/statistics', component: AdsStatisticsComponent, canActivate: [CanActivateAuthGuard] },
  { path: 'profile/settings', component: ProfileSettingsComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Settings' },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Profile' },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateAuthGuard], title: 'Twitter Clone | Home' },
  { path: 'verification/:verificationId', component: VerificationComponent },
  { path: 'register', component: RegisterComponent, title: 'Twitter Clone | Register' },
  { path: 'login', component: LoginComponent, title: 'Twitter Clone | Login' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
