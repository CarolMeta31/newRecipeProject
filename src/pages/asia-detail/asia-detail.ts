import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recip } from '../../models/cont';

/**
 * Generated class for the AsiaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-asia-detail',
  templateUrl: 'asia-detail.html',
})
export class AsiaDetailPage {
recip:Recip;

constructor(public navCtrl: NavController, public navParams: NavParams) 
{
    this.recip = this.navParams.get("recip");
}
}