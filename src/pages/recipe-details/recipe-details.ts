import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  data = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data=navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailsPage');
  }
  goback(){
    this.navCtrl.setRoot(HomePage);
  }
}
