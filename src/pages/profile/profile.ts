import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, Alert} from 'ionic-angular';
import firebase from 'firebase';

import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  username:string='';
  email:string='';
  phone:string;
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/recipeproject-b080b.appspot.com/o/download.png?alt=media&token=5a1d0e39-86ca-49f7-84d9-220bef74dc60';
 moveon=true;
 public credentialsFG:FormGroup; 


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public alertCtrl:AlertController,
    public navParams: NavParams,private authPro: AuthProvider,private formBuilder:FormBuilder) {
  
  
      this.credentialsFG=this.formBuilder.group({
     
        username:['',Validators.compose([Validators.minLength(3),Validators.pattern('[a-zA-Z]*'),
          Validators.required ])],
    
        email:['',Validators.compose([ Validators.required ,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    
        phone:['',Validators.compose([Validators.minLength(10),Validators.maxLength(10),
          Validators.pattern('[0-9]*'), Validators.required ])],
        
         
           
      })
    
  }

  addProfile(){
    if (!this. credentialsFG.valid){
  console.log("Nice try");
  const alertName:Alert =this.alertCtrl.create({
         subTitle:'Nice try',
          buttons:[{
              text:'Cancel',
              role:'cancel'
            },
            {
              text:'ok',
              handler:data=>{
                
              }
            }]
          })
        alertName.present();
      }
    
    else {
      this.authPro.saveProfile(this.credentialsFG.value.username,this.credentialsFG.value.email,
      this.credentialsFG.value.phone).then( ()=>{

       // this.credentialsFG.reset();

      });

      const alert = this.alertCtrl.create({
        title: 'Welcome New Friend!',
        subTitle: 'You can access our suggsetion and community tabs.',
        buttons: [{
          text:'ok',
        handler:data=>{
          this.navCtrl.setRoot(HomePage);
        }
          
        }]
      })
      alert.present();
    
     
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
