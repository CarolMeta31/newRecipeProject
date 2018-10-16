import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase , {User} from 'firebase/app';
import 'firebase/auth';
import {AlertController} from 'ionic-angular';
import {Platform} from "ionic-angular";

@Injectable()
export class AuthProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;
  currentPicture: string = null
  newPicture:any;
databaseRef:firebase.database.Reference
pictureUrl:string;

  constructor() {
    console.log('Hello AuthProvider Provider');

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })

  }

  getProfile():firebase.database.Reference{
    
    return this.userProfile;
  }

 
//saves user information of profile page to firebase
saveProfile(username:string,email:string,phone:string):any{
  return this.userProfile.update({username,email,phone})

 }
 


 //login as a guest not a registered app user
 anonLogin(): Promise<any> {

  return firebase.auth().signInAnonymously()
    .then(response => {
      console.log(response);
    })
}

 signOut():Promise<any>{
  // const userId:string = firebase.auth().currentUser.uid;
  // firebase.database().ref(`/userProfile/${userId}`).off();
  return firebase.auth().signOut();
}

saveImage(proPicture){
  firebase.storage().ref(`/profilePictures/${this.currentUser.uid}`).putString(proPicture,'base64',{contentType:'image/png'})
  .then((savedProfilePicture) => {
    
    savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
    this.pictureUrl = downloadedUrl;
      this.userProfile.child('/profile').set(downloadedUrl)
   
    })
   

    })
    console.log(this.pictureUrl)
return this.pictureUrl;
}
}
