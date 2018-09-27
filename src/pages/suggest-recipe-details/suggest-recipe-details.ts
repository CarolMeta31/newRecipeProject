import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';

/**
 * Generated class for the SuggestRecipeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggest-recipe-details',
  templateUrl: 'suggest-recipe-details.html',
})
export class SuggestRecipeDetailsPage {
  recipe: Recipe;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe = this.navParams.get("recipe");

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestRecipeDetailsPage');
  }

}
