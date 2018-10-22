import { SplashPage } from './../splash/splash';
import { LoginPage } from './../login/login';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip" ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
//this takes you to the next login 
skip(){
  this.navCtrl.push(LoginPage);
}
//this changes when you reach the last slide 
slideChanged() {
  if (this.slides.isEnd())
    this.skipMsg = "Alright, I got it";
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

 
}
