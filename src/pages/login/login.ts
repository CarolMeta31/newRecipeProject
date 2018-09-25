import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Alert,LoadingController,
  Loading } from 'ionic-angular';
 import { AuthProvider } from './../../providers/auth/auth';
  import { HomePage } from './../home/home';
  import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  
  private load:Loading;

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(public navCtrl: NavController,
    public loadCtrl:LoadingController,
    public alertCtrl:AlertController,private authPro:AuthProvider, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
//navigation to the home page for guest user
anonLogin(){
  this.authPro.anonLogin();
  this.navCtrl.push(MenuPage)
}
//connets the phone login and alerts for the OTP
smsLogin(phoneNumber: number, recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
  const appVerifier = recaptchaVerifier;
  const phoneNumberString = "+" + phoneNumber;
  //Signin with phonenumbers requires BOTH the phone number and a verified captcha
  firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    .then(confirmationResult => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{name: 'confirmationCode', placeholder: 'Confirmation Code'}],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
               //nav back if u cancel OTP 
            this.navCtrl.pop()
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
                .then(function (result) {
                  // User signed in successfully.

                  console.log(result.user);
                  //Pop back to the previous page.
                  this.navCtrl.pop();
                 // this.navCtrl.push(HomePage)
                }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      prompt.present();
      //nav to  Menu Page
      this.navCtrl.push(MenuPage);
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });

}
}
