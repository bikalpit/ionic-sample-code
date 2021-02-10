import { Component } from "@angular/core";
import { Platform, App, NavController, AlertController, NavParams ,ToastController, MenuController, LoadingController} from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { global_data } from '../../providers/global';
/*import { HomePage } from "../home/home";*/
import { LoginPage } from "../login/login";

/**
* Generated class for the ChangePasswordPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
selector: 'page-change-password',
templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
loading:any;
/*changePassForm: FormGroup;*/
requestObject:any;
type : any;
changePassword = { old_password: "", new_password: "", confirm_password:"" };

constructor(public platform: Platform,public navCtrl: NavController,
				public navParams: NavParams,
				public forgotCtrl: AlertController, 
          		public menu: MenuController, 
          		public toastCtrl: ToastController, 
              public formBuilder: FormBuilder,
          		public http : HttpClient,
          		public loadingCtrl: LoadingController,
              public appCtrl: App
          	) {

  if(localStorage.getItem("user_type") == "client"){
  this.type = "user";
  }else{
     this.type = "staff";
}
 /*this.changePassForm = this.formBuilder.group({
      old_password  : ['', Validators.compose([Validators.required])],
      new_password  : ['', Validators.compose([Validators.required])],
      confirm_password  : ['', Validators.compose([Validators.required])],
    
    });*/
}

ionViewDidLoad() {
console.log('ionViewDidLoad ChangePasswordPage');
}
showLoader(message) {
  this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
  });
  this.loading.present();
}

cancle_click(){
  
  this.navCtrl.pop();

}

set_password() {
  /* Temporary code */
  /*localStorage.clear();
   if(localStorage.getItem('user_email')){
      this.platform.ready().then( () => {
         this.navCtrl.setRoot(HomePage);
       });
      
    } else {
      this.platform.ready().then( () => {
         this.navCtrl.setRoot(LoginPage);
       });
     
    }*/
     /* Temporary code */

    /* original code which is working fine */
    if(this.changePassword.old_password && this.changePassword.new_password && this.changePassword.confirm_password){
     if(this.changePassword.new_password == this.changePassword.confirm_password){
      this.showLoader("Updating password...")
    this.requestObject = {
      "api_key" : global_data.api_key,
      "user_id" : localStorage.getItem("user_id"),
      "type" : this.type,
      "old_password" : this.changePassword.old_password,
      "new_password" : this.changePassword.new_password,
      "confirm_password" : this.changePassword.confirm_password,
      "action" : "change_password"
  };
   
     this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
    .subscribe((res: any) => {     
         this.loading.dismiss();
          if(res.status == "true"){
           	let toast = this.toastCtrl.create({
              message: 'Password updated successfully',
              duration: 3000,
              position: 'center',
             
            });
            toast.present();
               localStorage.clear();               
               this.appCtrl.getRootNav().setRoot(LoginPage);
            }else{
 			let toast = this.toastCtrl.create({
              message: "Incorrect old password",
              duration: 3000,
              position: 'center',    
            });
            toast.present();
            }
    }, error => {  
    });
   }else{
let toast = this.toastCtrl.create({
              message: 'Password mismatch',
              duration: 3000,
              position: 'center',
            });
            toast.present();

   }
 }else{
let toast = this.toastCtrl.create({
              message: 'Please fill all fields',
              duration: 3000,
              position: 'center',
            });
            toast.present();

   }
  }
}
