import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, Alert} from 'ionic-angular';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  captureDataUrl = 'https://firebasestorage.googleapis.com/v0/b/recipeproject-b080b.appspot.com/o/download.png?alt=media&token=5a1d0e39-86ca-49f7-84d9-220bef74dc60';
 moveon=true;
 public photos : any;
 public base64Image : string;
 isOn:boolean;
status:string;

 public credentialsFG:FormGroup; 


  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public alertCtrl:AlertController,
    public navParams: NavParams,private authPro: AuthProvider,private camera:Camera,
    private formBuilder:FormBuilder) {
     
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
  ngOnInit() {
    this.photos = [];
  }

  capture() {
    //setup camera options
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera. MediaType.PICTURE,
      correctOrientation:true,
      saveToPhotoAlbum:true
    };

   this.camera .getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.captureDataUrl);
      this.photos.reverse();
    }, (err) => {
      // Handle error
      console.log(err)
    }); 
  }
  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
      this.showSuccesfulUploadAlert();
    });

  }
  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded ',
      buttons: ['OK']
    });
    alert.present();

 
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
