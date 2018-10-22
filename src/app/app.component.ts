import { SplashPage } from './../pages/splash/splash';

import { ProfilePage } from './../pages/profile/profile';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { OnboardingPage } from './../pages/onboarding/onboarding';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
 
import { HomePage } from '../pages/home/home';
import { FavouritePage } from '../pages/favourite/favourite';

var config = {
  apiKey: "AIzaSyDBZ5GZiR6gRTwhAIvhjcgHtM-eS2Rg2BM",
  authDomain: "recipeproject-b080b.firebaseapp.com",
  databaseURL: "https://recipeproject-b080b.firebaseio.com",
  projectId: "recipeproject-b080b",
  storageBucket: "recipeproject-b080b.appspot.com",
  messagingSenderId: "689720004385"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  @ViewChild(Nav) nav: Nav;

  rootPage: any =SplashPage;
 
  



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   firebase.initializeApp(config);
  
   const unsubscribe =firebase.auth().onAuthStateChanged(user=>{
    this.rootPage=OnboardingPage;
    if ( user.isAnonymous==true) {
      console.log("firebase user not available",user)
      
         
      unsubscribe();
    }
    else{
      console.log("firebase user available",user)

     
      unsubscribe();
  
    }
  })
  
  this.rootPage=SplashPage;
  }

}

