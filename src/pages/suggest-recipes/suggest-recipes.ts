import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { SuggestRecipeDetailsPage } from '../suggest-recipe-details/suggest-recipe-details';
import { SuggestRecipeProvider } from '../../providers/suggest-recipe/suggest-recipe';


/**
 * Generated class for the SuggestRecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggest-recipes',
  templateUrl: 'suggest-recipes.html',
})
export class SuggestRecipesPage {

  recipes: Recipe[];
  searchTerm: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private suggestProvider:SuggestRecipeProvider) {
  }
  initializeRecipes(): void {
    this.recipes = this.suggestProvider.getRecipes();
  } 
  ionViewDidLoad() {
    this.initializeRecipes();
    console.log('ionViewDidLoad SuggestRecipesPage');
  }
  onSelect(recipe: Recipe): void {
    this.navCtrl.push(SuggestRecipeDetailsPage, {recipe: recipe});
  }
searchRecipes(){
      // Reset recipes array back to all of the items
      this.initializeRecipes();

      // if the search term is an empty string return all items
      if (!this.searchTerm) {
        
        return this.recipes;
      }

      // Filter recipes
      this.recipes = this.recipes.filter((item) => {
          return item.recipeName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }); 
    }
}
