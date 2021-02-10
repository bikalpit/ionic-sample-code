import { Component } from '@angular/core';
import {  NavController, NavParams ,App, AlertController, ModalController, ToastController, MenuController, LoadingController } from "ionic-angular";
import { HttpClient } from '@angular/common/http';
import { global_data } from '../../providers/global';
import { DatePipe } from '@angular/common';
import { AdminViewDetailsAppointmentPage } from "../admin-view-details-appointment/admin-view-details-appointment";

@Component({
  selector: 'page-admin-new-appointment',
  templateUrl: 'admin-new-appointment.html',
})
export class AdminNewAppointmentPage {
  public trips: any;
  loading: any;
  htmlData: any;
  newAppointment = [];
  page = 0;
  reason: any="Other Reason";
  noData: any;
  currSymbol: any;
  isloadmore: boolean = false;
  requestObject: any;
  requestRejectObject:any;
  datee: any;
  currentDate: any;
  from:string;

  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public modelCtrl: ModalController,
    public datepipe: DatePipe,
    public menu: MenuController,
    public http: HttpClient, public appCtrl: App,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,


  ) {
    this.from = navParams.get('from');
    // this.fnLoadAppointment(0);
    console.log('Active',this.from);
    this.currSymbol=localStorage.getItem("currSymbol");
  }
  ionViewDidEnter() {
    this.fnLoadAppointment(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminNewAppointmentPage');
  }
  fnLoadAppointment(page){
    this.isloadmore = false;
    this.page = page;
    this.showLoader("Loading appointments...");
    this.requestObject = {
      "api_key": global_data.api_key,
      "user_id": localStorage.getItem('user_id'),
      "page": page,
      "user_type": localStorage.getItem('user_type'),
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
            this.newAppointment.push(this.htmlData[i]);
          }
        } else {
          this.noData = "No Data Available";
        }
      }, error => {
      });
  }
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }
  fnCancelBooking(order_id, gc_staff_event_id) {

    let alert = this.alertController.create({
      title: 'Alert',
      message: 'Are you sure you want to Reject this booking appointment?',
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
            this.requestRejectObject = {
              "api_key": global_data.api_key,
              "order_id": order_id,
              "reject_reason": this.reason,
              "gc_event_id": "",
              "gc_staff_event_id": "",
              "pid": "",
              "action": "reject_appointment"
            };
            console.log('Reject Req ',this.requestRejectObject);
            // console.log(JSON.stringify('Reject Req ',this.requestRejectObject));
            this.http.post(global_data.url, this.requestRejectObject, { headers: { 'Content-Type': 'application/json' } })
              .subscribe((res: any) => {
                this.loading.dismiss();
                if (res.status == "true") {
                  // this.appCtrl.getRootNav().setRoot(BookingsPage);
                    let toast = this.toastCtrl.create({
                    message: res.response,
                    duration: 3000,
                    position: 'center',

                  });
                  toast.present();
                  console.log('Yes');
                } else {
                  console.log('No');
                }
              }, error => {
              });
           
          }
        }
      ]
    });
    alert.present();
  }
  fnViewAppointment(order_Id){
    console.log("Ok View Details");
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
          let modal = this.modelCtrl.create(AdminViewDetailsAppointmentPage, { viewData: viewData, order_Id: order_Id });
          modal.onDidDismiss(() => {
          });
          modal.present();
        } else {
          this.loading.dismiss();
        }
      }, error => {
        console.log(error);
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
        "user_id": localStorage.getItem('user_id'),
        "page": this.page,
        "user_type": localStorage.getItem('user_type'),
        "action": "get_user_appointments_list"
      };

      this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.htmlData = res.response;
            for (let i = 0; i < this.htmlData.length; i++) {
              this.newAppointment.push(this.htmlData[i]);
            }
            this.isloadmore = false;
          } else {

          }
        }, error => {
        });
      infiniteScroll.complete();

    }, 500);

  }

}
