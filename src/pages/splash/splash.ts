
import { OnboardingPage } from './../onboarding/onboarding';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
 // For splash screen
 splash = true;
 tabBarElement:any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  // Please note that this layout is for the tab layout
  
  ionViewDidLoad() {
    
    setTimeout(() => {
      this.splash = true;
      
    }, 8000);
  }

}
