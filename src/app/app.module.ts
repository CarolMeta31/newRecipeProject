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
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { CommunityPage } from '../pages/community/community';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { RecipeProvider } from '../providers/recipe/recipe';

import { Http, HttpModule } from '@angular/http';

import {HttpClientModule} from '@angular/common/http';
import { SuggestRecipesPage } from '../pages/suggest-recipes/suggest-recipes';
import { SuggestRecipeProvider } from '../providers/suggest-recipe/suggest-recipe';
import { SuggestRecipeDetailsPage } from '../pages/suggest-recipe-details/suggest-recipe-details';
import { AsiaDetailPage } from '../pages/asia-detail/asia-detail';
import { AsiaRecipePage } from '../pages/asia-recipe/asia-recipe';
import { RecipService } from '../providers/recip.service';

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
<<<<<<< HEAD
    RecipeDetailsPage
=======
    SuggestRecipesPage,
    SuggestRecipeDetailsPage,
    AsiaDetailPage,
    AsiaRecipePage

>>>>>>> 6260a687ebdec22a0c78dc5196eebeac46066bb8
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
<<<<<<< HEAD
    RecipeDetailsPage
=======
    SuggestRecipesPage,
    SuggestRecipeDetailsPage,
    AsiaDetailPage,
    AsiaRecipePage
>>>>>>> 6260a687ebdec22a0c78dc5196eebeac46066bb8

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RecipeProvider,
    SuggestRecipeProvider,
  RecipService
  ]
})
export class AppModule {}
