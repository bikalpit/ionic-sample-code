import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { LoginPage } from "../login/login";
import { global_data } from '../../providers/global';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  loading: any;
  requestObject: any;
  register = { firstname: "", lastname: "", email: "", password: "", phone: "", address: "", city: "", state: "", zipcode: "" };

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, public http: HttpClient, public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
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
  fnRegister() {
    if (this.register.firstname != "" && this.register.lastname != "" && this.register.email != "" && this.register.password != "" && this.register.phone != "" && this.register.address != "" && this.register.city != "" && this.register.state != "" && this.register.zipcode != "") {

      this.showLoader("Creating account...");
      this.requestObject = {
        "api_key": global_data.api_key,
        "email": this.register.email,
        "password": this.register.password,
        "first_name": this.register.firstname,
        "last_name": this.register.lastname,
        "phone": this.register.phone,
        "address": this.register.address,
        "city": this.register.city,
        "state": this.register.state,
        "zipcode": this.register.zipcode,
        "action": "add_customer"
      }
      console.log(JSON.stringify(this.requestObject));

      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            console.log(JSON.stringify(res));
            this.presentToast("Account created successfully");
            this.nav.setRoot(LoginPage);
          } else {
            this.presentToast("Email already exists");
          }

        }, error => {

        });

    } else {
      this.presentToast("Please fillup all fields");
    }
  }

  // go to login page
  login() {

    this.requestObject = {

    }
    this.nav.setRoot(LoginPage);
  }


  fnBackToLogin() {
    this.nav.setRoot(LoginPage);
  }

}
