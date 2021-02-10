import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HomePage } from "../home/home";
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
	feedBack = {feedbackMessage : ""};
  loading:any;
	requestObject: any;
  constructor(public navCtrl: NavController,
             public navParams: NavParams, 
             public toastCtrl: ToastController,
             public loadingCtrl: LoadingController,
             public http : HttpClient ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
showLoader(message) {
  this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-icon-white.svg"/><div>' + message + '</div>',
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
  fnSendFeedback(){  

  if(this.feedBack.feedbackMessage){
    this.showLoader("Fetching methods...");
  this.requestObject = {
    "api_key" : global_data.api_key,
    "fullname": localStorage.getItem("fullname"),
    "message" : this.feedBack.feedbackMessage,
     "action":"feedback_email_send"
  };
  
  this.http.post(global_data.url, this.requestObject, {headers: {'Content-Type': 'application/json'}})
  .subscribe((res: any) => {    
 this.loading.dismiss(); 
        if(res.status == "true"){

            this.presentToast('Thankyou for your valuable feedback'); 
            this.navCtrl.setRoot(HomePage);
          }else{
            this.presentToast('Unable to submit feedback'); 
          }
  }, error => {  
      this.presentToast('Server down....'); 
  });
}else{
            this.presentToast('Please enter feedback'); 
          }
  
  }


}
