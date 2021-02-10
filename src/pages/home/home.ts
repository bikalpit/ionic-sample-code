import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import { DatePipe } from '@angular/common';

import {NotificationsPage} from "../notifications/notifications";
/*import {SettingsPage} from "../settings/settings";*/
import { BookingsPage } from "../bookings/bookings";
import { MyAccountPage } from "../my-account/my-account";
import { TransactionsPage } from "../transactions/transactions";
import { BookingTripPage } from "../booking-trip/booking-trip";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public nav: NavController,
              public datepipe: DatePipe,
              public popoverCtrl: PopoverController) {

  }


  fullname : any = localStorage.getItem('fullname');
  user_type : any = localStorage.getItem('user_type');
  myDate: String = this.datepipe.transform(new Date(), 'HH:mm');
  
   /* Pages List */
  BookingTrip = BookingTripPage;
  Bookings = BookingsPage;
  Account = MyAccountPage;
  Transactions = TransactionsPage;

  ionViewWillEnter() {
    
  }

  // to go account page
  goToAccount() {
    this.nav.setRoot(MyAccountPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
}

