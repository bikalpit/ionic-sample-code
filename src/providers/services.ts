import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController} from 'ionic-angular';
//import 'rxjs/add/operator/map';

@Injectable()
export class ServicesProvider {
  
  constructor(
  				public alertCtrl : AlertController,
          public loadingCtrl: LoadingController) {
    console.log('Hello Services Provider');
  }


    

}
