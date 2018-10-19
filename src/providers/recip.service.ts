import { Recip } from "../models/cont";
import { Injectable } from '@angular/core';
import { RECIP } from "../mocks/suggestion-recipe";

@Injectable()
export class RecipService {

    getRecipe(): Recip[] {
        return RECIP;
    } 
}  