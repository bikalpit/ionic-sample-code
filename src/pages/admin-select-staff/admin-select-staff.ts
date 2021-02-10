import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-admin-select-staff',
  templateUrl: 'admin-select-staff.html',
})
export class AdminSelectStaffPage {
  availableStaff: any = [
    { testID: 1, staffName: " test1" },
    { testID: 2, staffName: " test2" },
    { testID: 3, staffName: "dgdfgd" },
    { testID: 4, staffName: "UricAcid" }
  ]
  checked = [];


  from: string = "";
  action: string = "";
  requestAssignObject: any;
  requestObject: any;
  loading: any;
  htmlData: any;
  reason: any;
  noData: any;
  allUsers = [];
  orderId: string = "";

  constructor(public loadingCtrl: LoadingController, public viewCtrl: ViewController,
    public http: HttpClient,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.orderId = navParams.get('orderId');
    console.log('Order Id', navParams.get('orderId'));
    this.fnGetAllAvailableStaff();

  }
  fnGetAllAvailableStaff() {
    this.requestObject = {
      "api_key": global_data.api_key,
      "action": "all_available_staff_details"
    };
    this.showLoader("Loading appointments...");
    console.log(JSON.stringify(this.requestObject));
    this.http.post(global_data.url, this.requestObject, { headers: { 'Content-Type': 'application/json' } })
      .subscribe((res: any) => {
        this.loading.dismiss();
        if (res.status == "true") {
          this.noData = "No Data Available";
          this.htmlData = res.response;

          // console.log('all user',JSON.stringify(res.htmlData));
          for (let i = 0; i < this.htmlData.length; i++) {
            this.allUsers.push(this.htmlData[i]);
          }
          console.log('all user', this.allUsers);
        } else {
          this.noData = "No Data Available";
        }
      }, error => {
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSelectStaffPage');
  }
  fnCloseModel() {
    this.viewCtrl.dismiss();
  }

  //Adds the checkedbox to the array and check if you unchecked it
  addCheckbox(event, checkbox: String) {

    if (event.checked) {
      this.checked.push(checkbox);
    } else {
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    })
  }
  done() {
    if (this.checked.length == 0) {
      this.presentToast("please check minimum one staff");
    } else {
      console.log(this.checked.toString());
      this.requestAssignObject = {
        "api_key": global_data.api_key,
        "staff_ids": this.checked.toString(),
        "order_id": this.orderId,
        "action": "staff_assign_to_booking"
      };
      this.showLoader("Loading appointments...");
      console.log('Request assigned ', this.requestAssignObject);
      this.http.post(global_data.url, this.requestAssignObject, { headers: { 'Content-Type': 'application/json' } })
        .subscribe((res: any) => {
          this.loading.dismiss();
          if (res.status == "true") {
            this.htmlData = res.response;
            this.presentToast("Successfully assigned");
            this.fnCloseModel();
            console.log('all user', this.allUsers);
          } else {
            this.presentToast("Unsuccessfully assigned");
          }
        }, error => {
        });
    }
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
}
