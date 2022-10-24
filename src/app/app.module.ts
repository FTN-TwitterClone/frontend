import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    TweetCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
