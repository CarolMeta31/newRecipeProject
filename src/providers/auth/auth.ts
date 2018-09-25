import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase , {User} from 'firebase/app';
import 'firebase/auth';
import {AlertController} from 'ionic-angular';
import {Platform} from "ionic-angular";

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }
  
 //login as a guest not a registered app user
 anonLogin(): Promise<any> {

  return firebase.auth().signInAnonymously()
    .then(response => {
      console.log(response);
    })
}
}
