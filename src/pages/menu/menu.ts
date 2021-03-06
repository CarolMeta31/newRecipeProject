import { ProfilePage } from './../profile/profile';
import { TabsPage } from './../tabs/tabs';
import { CommunityPage } from './../community/community';
import { SuggestionPage } from './../suggestion/suggestion';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 

}
