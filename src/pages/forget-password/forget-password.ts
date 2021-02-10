import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ToastController, MenuController, LoadingController} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HttpClient } from '@angular/common/http';
import { ServicesProvider } from '../../providers/services';
import { LoginPage } from "../login/login";
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
   providers:[ServicesProvider]
})
export class ForgetPasswordPage {
  loading:any;
  requestObject:any;
  forgetData_email = { user_email: "" };
  forgetData_otp = { otp: "" , email:""};
  forgetData_password = { email: "", new_password: "", confirm_password:"" };

  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public forgotCtrl: AlertController, 
              public menu: MenuController, 
              public http : HttpClient,
              public toastCtrl: ToastController, 
              public loadingCtrl: LoadingController,
              public serviceCtrl : ServicesProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
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
send_otp() {
  // this.navCtrl.setRoot(LoginPage);


  if(this.forgetData_email.user_email){
    this.showLoader("Sending otp...");
    this.requestObject = {
      "api_key" : global_data.api_key,
      "email" : this.forgetData_email.user_email,
      "action" : "otp"
  };
   
    this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
    .subscribe((res: any) => {     
         this.loading.dismiss();
          if(res.status == "true"){
             this.presentToast("OTP sent to email");
                 this.slides.slideNext();
            }else{
              this.presentToast("OTP not sent");
            }
    }, error => {  
      this.presentToast("Server down....");
    });
  }else{
   this.presentToast("Please enter email");
  }
  }

verify_otp() {
  if(this.forgetData_otp.otp){
  this.showLoader("Verifying otp");
    this.requestObject = {
      "api_key" : global_data.api_key,
      "email" : this.forgetData_otp.email,
      "otp" : this.forgetData_otp.otp,
      "action" : "confirm_otp_email"
  };
   this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
    .subscribe((res: any) => {     
         this.loading.dismiss();
          if(res.status == "true"){
                  
                  this.slides.slideNext();
            }else{
            this.presentToast("Incorrect OTP");
            }
    }, error => {  
      this.presentToast("Server Down....");
    });
}else{
  this.presentToast("Please enter OTP");
}
  }

  set_password() {
    if(this.forgetData_password.new_password && this.forgetData_password.confirm_password){
    if(this.forgetData_password.new_password == this.forgetData_password.confirm_password){
      this.showLoader("Updating password...");
    this.requestObject = {
      "api_key" : global_data.api_key,
      "email" : this.forgetData_password.email,
      "newpassword" : this.forgetData_password.new_password,
      "action" : "forgot_password"
  };
   this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
    .subscribe((res: any) => {     
         this.loading.dismiss();
          if(res.status == "true"){
                 this.presentToast("Password updated");
                 this.navCtrl.setRoot(LoginPage);
            }else{
 this.presentToast("Unable to update password");
            }
    }, error => {  
      this.presentToast("Server down...");
    });
   
  }else{
    this.presentToast("Password mismatch");
  }
  }else{
    this.presentToast("Please fill password fields");
  }
}

  prev() {
    this.slides.slidePrev();
  }

  fnBackToLogin(){
       this.navCtrl.setRoot(LoginPage);
  }

}
