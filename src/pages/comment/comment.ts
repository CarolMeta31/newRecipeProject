import { CommunityPage } from './../community/community';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import { Element } from '@angular/compiler';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  username: string = '';
  message: string = '';
  sub;
  messages: object[] = []


  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this.sub = this.db.list('/chat').valueChanges().subscribe( (data) =>{
    this.messages = data;
        let joinData ={
          sendDate:Date()
        }  
      }); 


  }

  sendmessage(){
    this.db.list('/chat').push({
      // username: this.username,
      message: this.message,
      sendDate:Date()

    }).then( () =>{
      //message is sent 
      
    });
    this.message='';
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

}
