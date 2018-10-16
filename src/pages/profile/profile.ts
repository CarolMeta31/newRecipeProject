import { CommunityPage } from './../community/community';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, Alert} from 'ionic-angular';
import 'firebase/database';
import 'firebase/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder,FormGroup,FormControl,Validators} from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import firebase, { User } from 'firebase/app';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private loading: any
  username:string='';
  email:string='';
  phone:string;
  imgPreview = 'https://firebasestorage.googleapis.com/v0/b/recipeproject-b080b.appspot.com/o/download.png?alt=media&token=5a1d0e39-86ca-49f7-84d9-220bef74dc60';
 moveon=true;
 userProfile:firebase.database.Reference;
  picture: string = null;
 public base64Image : string;
 isOn:boolean;
status:string;
currentUser:User
 public credentialsFG:FormGroup; 



  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public alertCtrl:AlertController,
    public navParams: NavParams,private authPro: AuthProvider,private camera:Camera,private imagePicker: ImagePicker,
    private base64: Base64,
    private formBuilder:FormBuilder) {
     
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          this.currentUser=user;
          this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`)
        }
      })
      this.alertCtrl = alertCtrl;
  
      this.credentialsFG=this.formBuilder.group({
     
        username:['',Validators.compose([Validators.minLength(3),Validators.pattern('[a-zA-Z]*'),
          Validators.required ])],
    
        email:['',Validators.compose([ Validators.required ,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    
        phone:['',Validators.compose([Validators.minLength(10),Validators.maxLength(10),
          Validators.pattern('[0-9]*'), Validators.required ])],
        
         
           
      })
    
  }
  // ngOnInit() {
  //   this.photos = [];
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
  }
//  updateProfile(username,email,phone){
//   this.authPro.saveProfile(this.credentialsFG.value.username,this.credentialsFG.value.email,
//     this.credentialsFG.value.phone)
//  }
  
  takePhoto() {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetHeight: 500,
      targetWidth: 500,
      allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }).then((profilePicture) => {
      this.picture = profilePicture;
    firebase.storage().ref(`profilePictures/${this.currentUser.uid}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
    .then((savedProfilePicture) => {
    
      savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
        this.picture =downloadedUrl
        this.imgPreview = downloadedUrl
        this.userProfile.child('/userPicture').set(downloadedUrl)
      
      })
     

      })
     
    }, err => {
      console.log('érror' + JSON.stringify(err))
    })

  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      const newAlert: Alert = this.alertCtrl.create({
        message: results,
        buttons: [{ text: 'ok', role: 'cancel' }]
      })
      newAlert.present()

      const pic = firebase.storage().ref('profilePictures/picture.png')
      pic.putString(results[0], 'base64', { contentType: 'image/png' })
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.saveImage(this.imgPreview);

        
      }
    }, (err) => { });





  }
  saveImage(results) {
    this.authPro.saveImage(results)
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Submitting...'
    });

    this.loading.present()

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
        subTitle: 'enjoy the community experience',
        buttons: [{
          text:'ok',


        handler:data=>{
          this.navCtrl.push(CommunityPage);
          
        }
          
        }]
      })
      alert.present();
    
     
    }
  }


}
