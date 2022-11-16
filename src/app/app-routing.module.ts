import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsStatisticsComponent } from './pages/ads-statistics/ads-statistics.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { CanActivateAuthGuard } from './services/security/can-activate-auth.guard';

const routes: Routes = [
  { path: 'ads/statistics', component: AdsStatisticsComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'profile/settings', component: ProfileSettingsComponent, canActivate:[CanActivateAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[CanActivateAuthGuard]},
  { path: 'home', component: HomeComponent, canActivate:[CanActivateAuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
