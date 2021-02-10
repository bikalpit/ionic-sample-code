import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminNewAppointmentPage } from "../admin-new-appointment/admin-new-appointment";
import { AdminAllCustomerPage } from "../admin-all-customer/admin-all-customer";
import { MyAccountPage } from "../my-account/my-account";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-admin-dashboard',
  templateUrl: 'admin-dashboard.html',
})
export class AdminDashboardPage {
  user_type : any = localStorage.getItem('user_type');
  myDate: String = this.datepipe.transform(new Date(), 'HH:mm');
  /* Pages List */
  AdminNewAppointment = AdminNewAppointmentPage;
  Account = MyAccountPage;
  constructor(  public datepipe: DatePipe,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDashboardPage');
  }
  gotoActiveAppointment(from){
    this.navCtrl.push(AdminNewAppointmentPage, 
      {from: from}
    );
  }
  gotoAllUser(from){
    this.navCtrl.push(AdminAllCustomerPage, 
      {from: from}
    );
    localStorage.setItem('from',from);
  }
}
