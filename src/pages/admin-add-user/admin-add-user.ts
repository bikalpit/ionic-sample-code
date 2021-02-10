import { Component } from '@angular/core';
import {NavController, NavParams ,ToastController,LoadingController} from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-admin-add-user',
  templateUrl: 'admin-add-user.html',
})
export class AdminAddUserPage {
  user = { email: "", password: "",fname:"", lname:"" };
  requestObject: any;
  loading: any;
  userType:string="staff";
  constructor( public loadingCtrl: LoadingController,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddUserPage');
  }
  selectUser(user){
    this.userType=user;
    console.log(user);
  }
  saveUser(){
    if(this.user.email && this.user.password && this.user.fname && this.user.lname){
      this.showLoader("");
      if(this.userType=='staff'){
        this.requestObject = {
          "api_key":global_data.api_key,
          "fullname":this.user.fname+" "+this.user.lname,
          "email":this.user.email,
          "pass":this.user.password,
          "action":"add_staff"
        };
      }else if(this.userType=='customer'){
        this.requestObject = {
          "api_key":global_data.api_key,
          "email":this.user.email,
          "password":this.user.password,
          "first_name":this.user.fname,
          "last_name":this.user.lname,
          "action":"add_customer"
        };
      }
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject,
        { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          console.log("admin",JSON.stringify(res));
          if (res.status == "true") {
            this. user = { email: "", password: "",fname:"", lname:"" };
            this.presentToast('Successfully save');
          }
        }, error => {
          this.presentToast('Server down....');
        });
  
    }else{
      this.presentToast('Enter All Fields');
    }

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
