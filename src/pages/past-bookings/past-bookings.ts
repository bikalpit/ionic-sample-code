import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { global_data } from '../../providers/global';
import { ViewDetailPage } from '../view-detail/view-detail';
/**
 * Generated class for the PastBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-past-bookings',
  templateUrl: 'past-bookings.html',
})
export class PastBookingsPage {
  public trips: any;
  loading: any;
  htmlData: any;
  noData: any;
  pastbookings = [];
  currSymbol: any;
  page = 0;
  isloadmore: boolean = false;
  requestObject: any;
  type: any;
  user_id:string;

  constructor(public nav: NavController,
    public forgotCtrl: AlertController,
    public modelCtrl: ModalController,
    public toastCtrl: ToastController,
    public menu: MenuController,
    public http: HttpClient,
    public loadingCtrl: LoadingController) {
    this.currSymbol = localStorage.getItem("currSymbol");
    if (localStorage.getItem("user_type") == "client") {
      this.type = "user";
      this.user_id=localStorage.getItem('user_id');
    } else if (localStorage.getItem("user_type") == "admin") {
      if(localStorage.getItem('from')=='customer'){
        this.type = "client";
      }else{
        this.type = "staff";
      }
     
      this.user_id = localStorage.getItem('whose_get_details');
    } else {
      this.type = "staff";
      this.user_id=localStorage.getItem('user_id');
    }
    this.fnLoadBooking(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastBookingsPage');
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }

  fnLoadBooking(page) {
    this.showLoader("Loading appointment...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "user_id": this.user_id,
      "page": page,
      "type": this.type,
      "action": "get_all_past_appointment"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        //alert(JSON.stringify(res.response));
        if (res.status == "true") {
          this.noData = "No Data Available";
          this.htmlData = res.response;
          for (let i = 0; i < this.htmlData.length; i++) {

            this.pastbookings.push(this.htmlData[i]);
          }
        } else {
          this.noData = "No Data Available";
        }
      }, error => {
      });

  }

  fnViewBooking(order_Id) {
    this.showLoader("Loading details...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "order_id": order_Id,
      "action": "get_appointment_detail"
    };
    console.log(JSON.stringify(this.requestObject));

    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {

          let viewData = {
            "pageName": 'past_booking',
            "pastBookingData": res.response
          }
          let modal = this.modelCtrl.create(ViewDetailPage, { viewData: viewData });
          modal.onDidDismiss(() => {
            // you can any function here as per your need
          });
          modal.present();

        } else {

        }
      }, error => {
      });


  }

  doRefresh(refresher) {
    this.isloadmore = false;
    this.page = 0;
    this.requestObject = {
      "api_key": global_data.api_key,
      "user_id": this.user_id,
      "page": "0",
      "type": this.type,
      "action": "get_all_past_appointment"
    };
    //alert(JSON.stringify(this.requestObject));   
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        //alert(JSON.stringify(res.response));
        if (res.status == "true") {
          this.pastbookings = res.response;
          refresher.complete();
        } else {

        }
      }, error => {
      });

  }

  doInfinite(infiniteScroll) {
    if (this.isloadmore)
      return;
    this.showLoader("Loading appointments...");
    this.isloadmore = true;
    this.page = this.page + 1;
    setTimeout(() => {
      this.requestObject = {
        "api_key": global_data.api_key,
        "user_id": this.user_id,
        "page": this.page,
        "type": this.type,
        "action": "get_all_past_appointment"
      };
      //alert(JSON.stringify(this.requestObject));   
      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          //alert(JSON.stringify(res.response));
          if (res.status == "true") {
            this.htmlData = res.response;
            for (let i = 0; i < this.htmlData.length; i++) {

              this.pastbookings.push(this.htmlData[i]);

            }
            this.isloadmore = false;
          } else {

          }
        }, error => {
        });

      infiniteScroll.complete();

    }, 3000);

  }


}
