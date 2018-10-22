import { FavouritePage } from './../favourite/favourite';
import { ProfilePage } from './../profile/profile';
import { SuggestionPage } from './../suggestion/suggestion';
import { CommunityPage } from './../community/community';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = SuggestionPage;
  // tab3Root: any = FavouritePage;
  tab4Root: any = ProfilePage;
  tab5Root: any = CommunityPage;
  user:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user')
    //console.log(this.user)
  }


}
