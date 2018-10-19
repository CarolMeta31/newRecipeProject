import { CommentPage } from './../comment/comment';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { FileChooser } from '@ionic-native/file-chooser';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Transfer, TransferObject, FileUploadOptions } from '@ionic-native/transfer';
import firebase from 'firebase';

/**
 * Generated class for the CommunityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
})
export class CommunityPage {
  likes: boolean = false;
  likesCounter: any = 0;
  cards: any;
  category: string = 'gear';
  isOn: boolean
  public photos: any;
  public base64Image: string;
  username: string = '';
  status: string;
  loader: any;
  VideoId: any;
  flag_upload = true;
  flag_play = true;
  constructor(public navCtrl: NavController,private authPro:AuthProvider,
    private alertCtrl:AlertController, public fileChooser:FileChooser, private mediaCapture:MediaCapture, private transfer:Transfer,public toastCtrl: ToastController, public loadingctrl:LoadingController ,public streamingmedia: StreamingMedia, public actionSheetCtrl:ActionSheetController, 
    private camera:Camera) {
    this.alertCtrl = alertCtrl;

    this.cards = new Array(10);}


    ngOnInit() {
      this.photos = [];
    }
    takePic() {
      //setup camera options
      const options: CameraOptions = {
        quality: 100, // picture quality
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true
      };
  
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
    }
  
    liked() {
      // this.likes = parseInt(this.likes,0) + 1;
      if (this.likes == false) {
        this.likes = true;
        this.likesCounter = parseInt(this.likesCounter, 0) + 1
      } else if (this.likes == true) {
        this.likes = false;
        this.likesCounter = parseInt(this.likesCounter, 0) - 1
      }
      // ..
    }
    comment(){
      this.navCtrl.push(CommentPage)

    }
    deletePhoto(index) {
      let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
      confirm.present();
    }
    Gallery() {
      const options: CameraOptions = {
        quality: 100, // picture quality
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: true
      }
      this.camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
    }
    upload() {
      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
  
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`images/${filename}.jpg`);
  
      imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();
      });
  
    }
    showSuccesfulUploadAlert() {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'successfuly posted ',
  
        buttons: ['OK']
      });
      alert.present();
  
      // clear the previous photo data in the variable
      //this.captureDataUrl = "";
  
    }
    playVideo() {
      let options: StreamingVideoOptions = {
        successCallback: () => { this.flag_upload = true; console.log('Video played'); },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape'
      };
      this.streamingmedia.playVideo(this.VideoId, options);
    }
    presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Gallery',
            handler: () => {
              this.getVideo();
            }
          },
  
          {
            text: 'Use Camera',
            handler: () => {
              this.capturevideo();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
  
      actionSheet.present();
    }
    getVideo() {
      this.fileChooser.open()
        .then(uri => {
          this.VideoId = uri;
          this.flag_play = false;
          this.flag_upload = false;
        })
        .catch(e => console.log(e));
    }
    capturevideo() {
      let options: CaptureVideoOptions = { limit: 1 };
      this.mediaCapture.captureVideo(options)
        .then((videodata: MediaFile[]) => {
          var i, path, len;
          for (i = 0, len = videodata.length; i < len; i += 1) {
            path = videodata[i].fullPath;
            // do something interesting with the file
          } 
          this.VideoId = path;
          this.flag_play = false;
          this.flag_upload = false;
        });
    }
    uploadVideo() {
      let storageRef = firebase.storage().ref();
  
  
      const fileTransfer: TransferObject = this.transfer.create();
      let options1: FileUploadOptions = {
        fileKey: 'video_upload_file',
        fileName: this.VideoId,
        headers: {},
        mimeType: "multipart/form-data",
        params: {},
        chunkedMode: false
  
  
      }
      this.presentLoading();
      fileTransfer.upload(this.VideoId, 'localhost/demo/uploadVideo.php', options1)
        .then((data) => {
          this.loader.dismissAll();
          this.flag_upload = true;
          this.showToast('middle', 'Video is uploaded Successfully!');
        }, (err) => {
          // error
          alert("error " + JSON.stringify(err));
        });
    }
    presentLoading() {
      this.loader = this.loadingctrl.create({
        content: "Uploading…"
      });
      this.loader.present();
    }
  
    showToast(Position: string, message: string) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 300,
        position: Position
  
      })
      toast.present(toast);
    }

    logOut(){
      this.authPro.signOut().then(()=>{
    window.location.reload()
      })
    
    
    }
}
