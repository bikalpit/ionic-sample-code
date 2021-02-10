import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AdminSelectStaffPage } from '../admin-select-staff/admin-select-staff';
@Component({
  selector: 'page-admin-view-details-appointment',
  templateUrl: 'admin-view-details-appointment.html',
})
export class AdminViewDetailsAppointmentPage {
  viewData: any;
  currSymbol: any;
  order_Id: string;
  constructor(
    public modelCtrl: ModalController,
    public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.currSymbol = localStorage.getItem("currSymbol");
    this.viewData = this.navParams.get('viewData');
    this.order_Id = this.navParams.get('order_Id');
    console.log(this.order_Id);
    console.log('Arshad ', this.viewData.MyBookingData);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminViewDetailsAppointmentPage');
  }
  fnCloseModel() {
    this.viewCtrl.dismiss();
  }
  gotoAssign() {
    let modal = this.modelCtrl.create(AdminSelectStaffPage, { orderId: this.order_Id });
    modal.onDidDismiss(() => { });
    modal.present();
    console.log("Assigned " + this.order_Id);
  }
}
