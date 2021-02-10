import { Component } from "@angular/core";
import { NavController, AlertController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { ForgetPasswordPage } from "../forget-password/forget-password";
import { global_data } from '../../providers/global';
import { ServicesProvider } from '../../providers/services';
// import { setRootDomAdapter } from "@angular/platform-browser/src/dom/dom_adapter";
// import { AdminAllApointmentPage } from "../admin-all-apointment/admin-all-apointment";
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ServicesProvider]
})
export class LoginPage {

  loading: any;
  requestObject: any;
  curSymbol: any;

  login = { email: "", password: "" };

  type = 'password';
  showPass = false;
  constructor(public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public serviceCtrl: ServicesProvider) {
    this.requestObject = {
      "api_key": global_data.api_key,
      "option_name": "ct_currency_symbol",
      "action": "get_setting"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject,
      { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.curSymbol = res.response[0].option_value;
        console.log(JSON.stringify(this.curSymbol));

        localStorage.setItem("currSymbol", this.curSymbol);
      }, error => {
        this.presentToast('Server down....');
      });

    this.menu.swipeEnable(false);
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  register() {
    this.nav.setRoot(RegisterPage);
  }

  showPassword() {

    this.showPass = !this.showPass;
  }

  fnLogin() {
    if (this.login.email && this.login.password) {
      this.showLoader("");
      this.requestObject = {
        "api_key": global_data.api_key,
        "email": this.login.email,
        "password": this.login.password,
        "action": "check_login"
      };
      console.log(JSON.stringify(this.requestObject));
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          console.log("admin",JSON.stringify(res));
          if (res.status == "true") {
          
            localStorage.setItem("user_id", res.response.id);
            localStorage.setItem("user_email", res.response.user_email);
            localStorage.setItem("fullname", res.response.fullname);
            localStorage.setItem("phone", res.response.phone);
            localStorage.setItem("user_type", res.response.usertype);
            localStorage.setItem("user_password", this.login.password);
            this.presentToast('Logged in successfully');
            this.nav.setRoot(HomePage);
            window.location.reload();

          } else {
            this.presentToast('Incorrect email and password');
          }
        }, error => {
          this.presentToast('Server down....');
        });
    } else {
      this.presentToast('Enter email and password');
    }
  }

  forgotPass() {
    this.nav.setRoot(ForgetPasswordPage);
  }

}


