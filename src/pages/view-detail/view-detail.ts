import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-detail',
  templateUrl: 'view-detail.html',
})
export class ViewDetailPage {
viewData:any;
currSymbol: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public viewCtrl: ViewController,) {
    this.currSymbol =  localStorage.getItem("currSymbol");
  	 this.viewData = this.navParams.get('viewData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDetailPage');
  }

  fnCloseModel(){
  	 this.viewCtrl.dismiss();
  }

}

