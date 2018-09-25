import { LoginPage } from './../pages/login/login';
import { OnboardingPage } from './../pages/onboarding/onboarding';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
 
import { HomePage } from '../pages/home/home';


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
  rootPage:any =OnboardingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
   firebase.initializeApp(config);

   const unsubscribe =firebase.auth().onAuthStateChanged(user=>{
    if (!user){
      this.rootPage=LoginPage;
      unsubscribe();
    }
    else{
      this.rootPage=OnboardingPage;
      unsubscribe();
    }
  })
  
 
  }
}

