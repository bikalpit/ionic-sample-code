import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController} from "ionic-angular";
import { HttpClient } from '@angular/common/http';

import { global_data } from '../../providers/global';
import { ServicesProvider } from '../../providers/services';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers:[ServicesProvider]
})
export class ProfilePage {
loading:any;
requestObject:any;	
responseModel:any;
type : any;
viewData : any;
  constructor(public navCtrl: NavController, public forgotCtrl: AlertController, 
              public menu: MenuController, 
              public toastCtrl: ToastController, 
              public http : HttpClient,
              public loadingCtrl: LoadingController,
              public serviceCtrl : ServicesProvider) {


  if(localStorage.getItem("user_type") == "client"){
   this.type = "user";
  }else{
    this.type = "staff";
  }
  
this.showLoader("Loading profile details...");
  	this.requestObject = {
    "api_key" : global_data.api_key,
   "user_id": localStorage.getItem("user_id"),
    "type": this.type,
    "action":"get_profile_detail"
  };
  //alert(JSON.stringify(this.requestObject));   
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {     
    this.loading.dismiss();
        if(res.status == "true"){
          this.viewData = res.response;
         }else{

          }
  }, error => {  
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

showLoader(message) {
  this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
  });
  this.loading.present();
}
}
