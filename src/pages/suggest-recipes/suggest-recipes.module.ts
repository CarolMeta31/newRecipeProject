import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestRecipesPage } from './suggest-recipes';

@NgModule({
  declarations: [
    SuggestRecipesPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestRecipesPage),
  ],
})
export class SuggestRecipesPageModule {}
