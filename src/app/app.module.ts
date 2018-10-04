import { RecipeDetailsPage } from './../pages/recipe-details/recipe-details';
import { FavouritePage } from './../pages/favourite/favourite';
import { LogoutPage } from './../pages/logout/logout';
import { ProfilePage } from './../pages/profile/profile';
import { MenuPage } from './../pages/menu/menu';
import { LoginPage } from './../pages/login/login';
import { OnboardingPage } from './../pages/onboarding/onboarding';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { CommunityPage } from '../pages/community/community';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { RecipeProvider } from '../providers/recipe/recipe';

import { Http, HttpModule } from '@angular/http';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnboardingPage,
    LoginPage,
    MenuPage,
    ProfilePage,
    CommunityPage,
    SuggestionPage,
    LogoutPage,
    FavouritePage,
    RecipeDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OnboardingPage,
    LoginPage,
    MenuPage,
    LogoutPage,
    ProfilePage,
    FavouritePage,
    CommunityPage,
    SuggestionPage,
    RecipeDetailsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RecipeProvider
  ]
})
export class AppModule {}
