import { HttpClient } from '@angular/common/http';
import {  Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
// Add all operators to Observable, needed for adding
// .map() on to the end of the http request
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
/*
  Generated class for the RecipeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeProvider {

    // set URL for API
    private BASE_URL = 'https://api.edamam.com/search?q=';  // URL to web api
    private APP_ID = '&20app_id=41ba8518'
    private API_KEY = '&app_key=20423e8e5e1ecf7475de95fe564fd57723'
     constructor(public http: Http) { }
     /**
      * "recipe"
      */
     getSearchResults(_searchString) {

        // fields to get back from API based on documenation
        let recipe = 'yield,uri,label,source,image,ingredientLines,ingredients';

        // set the parameters for the http request, these will be 
        // added to the query string
        let params: URLSearchParams = new URLSearchParams();
        params.set('results', '0:50')
        params.set('appId', this.APP_ID);
        params.set('appKey', this.API_KEY);
        params.set('recipe', recipe)

        // construct the URL, adding the search term to the url
        let url = this.BASE_URL + _searchString
        
        // execute the http get request, passing in query tring parameters
        // use the .map() to convert results to JSON to be returned to
        // the caller
        return this.http.get(url, { search: params })
            .map(res => res.json())

    }
}