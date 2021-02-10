import { Component } from '@angular/core';
import {  NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-admin-update-user',
  templateUrl: 'admin-update-user.html',
})
export class AdminUpdateUserPage {
userInfo:any;
requestObject: any;
loading: any;
  constructor(public toastCtrl: ToastController,public loadingCtrl: LoadingController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo=navParams.get('userInfo');
    console.log('getParam',this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUpdateUserPage');
  } 
  saveUpdate(){
    this.showLoader("");
    this.requestObject = {
      "api_key":global_data.api_key,
      "id":this.userInfo.id,
      "fullname":this.userInfo.fullname,
      "email":this.userInfo.email,
      "description":this.userInfo.description,
      "phone":this.userInfo.phone,
      "address":this.userInfo.address,
      "city":this.userInfo.city,
      "state":this.userInfo.state,
      "zip":this.userInfo.zip,
      "country":this.userInfo.country,
      "enable_booking":this.userInfo.enable_booking,
      "action":"update_staff"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        console.log("admin",JSON.stringify(res));
        if (res.status == "true") {
          this.presentToast('Successfully save');
        }
      }, error => {
        this.presentToast('Server down....');
      });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }
}
