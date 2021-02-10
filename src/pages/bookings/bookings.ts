import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingTripPage } from "../booking-trip/booking-trip";
import { MyBookingsPage } from "../my-bookings/my-bookings";
import { PastBookingsPage } from "../past-bookings/past-bookings";
import { UpcomingBookingsPage } from "../upcoming-bookings/upcoming-bookings";
/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
public trips: any;
tab1Root = MyBookingsPage;
tab2Root = PastBookingsPage;
tab3Root = UpcomingBookingsPage;
user_type: any;
whose_get_details:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.user_type = localStorage.getItem('user_type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  }

  fnAddBooking(){
 	this.navCtrl.push(BookingTripPage);
 }

}
