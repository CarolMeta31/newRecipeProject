import { CommentPage } from './../comment/comment';
import { SuggestionPage } from './../suggestion/suggestion';
import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { RecipeDetailsPage } from './../recipe-details/recipe-details';
import { RecipeProvider } from './../../providers/recipe/recipe';
import { Component,  OnInit,
  OnDestroy } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { CommunityPage } from '../community/community';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
 
  // the first page of the app
  rootPage: any;
newrecipe = [];
  // the array of items found
  items: any;

  // the search string
  searchQuery

  constructor(private _dataService: RecipeProvider, 
  private _loadingCtrl : LoadingController,
  private _nav: NavController,private authPro:AuthProvider) {
    



    // be sure to initizalize the model objects to avoid
    // weird errors in the console

    // the array of items found
    this.items = [];

    // the search string
    this.searchQuery = "Breakfast"
    this.getItems()
  }
    
  ionViewWillEnter(){
   this.searchQuery = 'Breakfast'
  }

  /**
   * do any initialization here NOT in the constructor
   */
  ngOnInit() {
    console.log('onInit');
  }

  ngOnDestroy() {
    console.log('onDestroy');
  }

  /**
   * query the API with the specific search string
   */
  getItems() {
    // clean up the string, if empty then exit
    let q = this.searchQuery.trim()
    if (q == '' || q.length < 3) {
      return;
    }

    let loading = this._loadingCtrl.create({
      content: 'Searching, Please Wait...'
    });
    loading.present();
    

    // have a string, do the search
    this._dataService.getSearchResults(q)
      .subscribe(
      // process the results..
      (data) => {
        console.log('search results', data.hits)
        this.items = data.hits
      },
      // handle an error condition...
      (err) => alert("Error Searching: " + err),
      // called when completely done processing
      () => {
        console.log("All Good With The Data");
        loading.dismiss()
      }
      );
  }
  AddRecipe(i: number) {
    this.newrecipe.push(this.items[i]);
    this._nav.setRoot(RecipeDetailsPage, {
      data:this.newrecipe
    })
  }
  logOut(){
    this.authPro.signOut().then(()=>{
  
  window.location.reload()
 
    })
  
    
  
  }
  chat(){
    this._nav.push(CommentPage)
  }
}
