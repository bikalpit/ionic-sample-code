import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { global_data } from '../../providers/global';
import { HttpClient } from '@angular/common/http';
import { BookingsPage } from "../bookings/bookings";
import { AdminUpdateUserPage } from "../admin-update-user/admin-update-user";
@Component({
  selector: 'page-admin-all-customer',
  templateUrl: 'admin-all-customer.html',
})
export class AdminAllCustomerPage {
  from: string = "";
  action: string = "";
  requestObject: any;
  loading: any;
  htmlData: any;
  reason: any;
  noData: any;
  allUsers = [];
  constructor(
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.from = navParams.get('from');
    console.log('From ', this.from);
    this.getAllUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAllCustomerPage');
  }
  getAllUsers() {
    if (this.from == 'customer') {
      this.action = "all_customer_list";
    } else if (this.from == 'staff') {
      this.action = "all_staff_details";
    }
    this.requestObject = {
      "api_key": global_data.api_key,
      "action": this.action
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
  showLoader(message) {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/img/animate-app-iconnew.svg"/>',
    });
    this.loading.present();
  }
  gotoBooking(id) {
    this.navCtrl.push(BookingsPage);
    localStorage.setItem('whose_get_details',id);
    console.log('whose_get_details',id);
  }
  gotoEdit(userInfo){
    console.log('Selected User',userInfo);
    this.navCtrl.push(AdminUpdateUserPage,{userInfo:userInfo});
  }
}
