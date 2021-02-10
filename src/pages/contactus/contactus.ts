import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { global_data } from '../../providers/global';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  loading: any;
  requestObject: any;
  htmlData: any;
  mycontact = [];
  noData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public altCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public http: HttpClient) {

      this.fnLoadContact();
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

  fnLoadContact() {
    this.showLoader("Loading Contact us...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "ct_company_address": "ct_company_address",
      "ct_company_email": "ct_company_email",
      "ct_company_phone": "ct_company_phone",
      "action": "get_contact_us"

    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        console.log(JSON.stringify(res.response));
        if (res.status == "true") {
          this.noData = "No Data Available";
          this.htmlData = res.response;
          for (let i = 0; i < this.htmlData.length; i++) {

            this.mycontact.push(this.htmlData[i]);
          }
        } else {
             this.noData = "No Data Available";
        }
      }, error => {
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

}
