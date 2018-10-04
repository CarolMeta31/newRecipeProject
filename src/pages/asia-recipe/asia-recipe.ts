import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recip } from '../../models/cont';
import { AsiaDetailPage } from '../asia-detail/asia-detail';
import { RecipService } from '../../providers/recip.service';


/**
 * Generated class for the AsiaRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-asia-recipe',
  templateUrl: 'asia-recipe.html',
})
export class AsiaRecipePage {
  recipe: Recip[];
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private recipService: RecipService) {  
     
  } 


  initializeRecipes(): void {
    this.recipe= this.recipService.getRecipe();
  } 
  
  ionViewDidLoad() {
    this.initializeRecipes();
  }
  onSelect(recip: Recip): void {
    this.navCtrl.push(AsiaDetailPage, {recip: recip});
  }
searchRecipes(){
      // Reset recipes array back to all of the items
      this.initializeRecipes();

      // if the search term is an empty string return all items
      if (!this.searchTerm) {
        
        return this.recipe;
      }

      // Filter recipes
      this.recipe = this.recipe.filter((item) => {
          return item.recipeName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }); 
    }
}
