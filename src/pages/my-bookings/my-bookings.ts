import { Component } from '@angular/core';
import { ItemSliding, IonicPage, NavController, App, AlertController, ModalController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { global_data } from '../../providers/global';
import { ViewDetailPage } from '../view-detail/view-detail';
import { BookingsPage } from "../bookings/bookings";
import { DatePipe } from '@angular/common';
/*import { MyBookingsPage } from "../my-bookings/my-bookings";
import { PastBookingsPage } from "../past-bookings/past-bookings";
import { UpcomingBookingsPage } from "../upcoming-bookings/upcoming-bookings";*/

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})
export class MyBookingsPage {
  public trips: any;
  loading: any;
  htmlData: any;
  mybooking = [];
  page = 0;
  reason: any;
  noData: any;
  currSymbol: any;
  isloadmore: boolean = false;
  requestObject: any;
  datee: any;
  currentDate: any;
  type: any;
  user_id:string;

  constructor(public nav: NavController,
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public modelCtrl: ModalController,
    public datepipe: DatePipe,
    public menu: MenuController,
    public http: HttpClient, public appCtrl: App,
    public loadingCtrl: LoadingController) {
    if (localStorage.getItem("user_type") == "client") {
      this.type = "user";
      this.user_id = localStorage.getItem('user_id');
    } else if (localStorage.getItem("user_type") == "admin") {
      if(localStorage.getItem('from')=='customer'){
        this.type = "client";
      }else{
        this.type = "staff";
      }
      this.user_id = localStorage.getItem('whose_get_details');
    } else {
      this.type = "staff";
      this.user_id = localStorage.getItem('user_id');
    }
    this.currSymbol = localStorage.getItem("currSymbol");
    if (localStorage.getItem("user_type") == "client") {
      this.reason = "user cancelled";
    } else {
      this.reason = "staff cancelled";
    }
    this.datee = new Date();
    this.currentDate = this.datepipe.transform(this.datee, 'dd-MM-yyyy');

    this.fnLoadBooking(0);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyBookingsPage');

  }



  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }

  fnLoadBooking(page) {
    this.isloadmore = false;
    this.page = 0;
    this.showLoader("Loading appointments...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "user_id":  this.user_id,
      "page": page,
      "user_type": this.type,
      "action": "get_user_appointments_list"
    };
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          this.noData = "No Data Available";
          this.htmlData = res.response;
          console.log(JSON.stringify(res.htmlData));

          for (let i = 0; i < this.htmlData.length; i++) {

            this.mybooking.push(this.htmlData[i]);
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
            "pageName": 'my_booking',
            "MyBookingData": res.response
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

  /*Reload data when scroll list */
  doRefresh(refresher) {
    this.isloadmore = false;
    this.page = 0;
    this.requestObject = {
      "api_key": global_data.api_key,
      "user_id":  this.user_id,
      "page": "0",
      "user_type": this.type,
      "action": "get_user_appointments_list"
    };
    console.log(JSON.stringify(this.requestObject));

    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {

        if (res.status == "true") {
          this.mybooking = res.response;
          console.log(JSON.stringify(this.mybooking));

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
        "user_id":  this.user_id,
        "page": this.page,
        "user_type": this.type,
        "action": "get_user_appointments_list"
      };
      console.log(JSON.stringify(this.requestObject));

      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.htmlData = res.response;
            console.log(JSON.stringify(this.htmlData));

            for (let i = 0; i < this.htmlData.length; i++) {
              this.mybooking.push(this.htmlData[i]);
            }
            this.isloadmore = false;
          } else {

          }
        }, error => {
        });
      infiniteScroll.complete();

    }, 500);

  }

  fnCancelBooking(order_id, gc_event_id, gc_staff_event_id, staffids) {

    let alert = this.alertController.create({
      title: 'Alert',
      message: 'Are you sure you want to cancel this booking appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No');
          }
        }, {
          text: 'Yes',
          handler: () => {

            this.showLoader("Cancelling...");
            this.requestObject = {
              "api_key": global_data.api_key,
              "order_id": order_id,
              "cancel_reason": this.reason,
              "gc_event_id": gc_event_id,
              "gc_staff_event_id": gc_staff_event_id,
              "pid": staffids,
              "action": "cancel_appointment"
            };
            console.log(JSON.stringify(this.requestObject));
            this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
              .subscribe((res: any) => {
                this.loading.dismiss();
                if (res.status == "true") {

                  this.appCtrl.getRootNav().setRoot(BookingsPage);
                  let toast = this.toastCtrl.create({
                    message: res.response,
                    duration: 3000,
                    position: 'center',

                  });
                  toast.present();
                } else {

                }
              }, error => {
              });
            console.log('Yes');
          }
        }
      ]
    });
    alert.present();

  }

} // main curly
