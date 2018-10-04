import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuggestRecipesPage } from '../suggest-recipes/suggest-recipes';
import { AsiaRecipePage } from '../asia-recipe/asia-recipe';



@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
  submit():void {
    this.navCtrl.push(SuggestRecipesPage);  
    
  }
  sumit():void {
    this.navCtrl.push(AsiaRecipePage);  }
}


