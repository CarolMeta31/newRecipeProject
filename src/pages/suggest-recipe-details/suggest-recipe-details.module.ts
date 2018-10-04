import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestRecipeDetailsPage } from './suggest-recipe-details';

@NgModule({
  declarations: [
    SuggestRecipeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestRecipeDetailsPage),
  ],
})
export class SuggestRecipeDetailsPageModule {}
