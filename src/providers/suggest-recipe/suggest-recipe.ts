
import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RECIPES } from '../../mocks/mock-recipes';

/*
  Generated class for the SuggestRecipeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SuggestRecipeProvider {

  getRecipes(): Recipe[] {
    return RECIPES;
} 

}
