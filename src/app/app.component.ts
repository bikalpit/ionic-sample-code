import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';


import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
/*import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import { MyBookingsPage } from "../pages/my-bookings/my-bookings";*/
import { BookingsPage } from "../pages/bookings/bookings";
import { TransactionsPage } from "../pages/transactions/transactions";
import { MyAccountPage } from "../pages/my-account/my-account";
import { BookingTripPage } from "../pages/booking-trip/booking-trip";
import { ContactusPage } from "../pages/contactus/contactus";
import { FeedbackPage } from "../pages/feedback/feedback";
import { AdminDashboardPage } from "../pages/admin-dashboard/admin-dashboard";
import { AdminNewAppointmentPage } from "../pages/admin-new-appointment/admin-new-appointment";
import { ImagesliderPage } from "../pages/imageslider/imageslider";
import { AdminAllCustomerPage } from "../pages/admin-all-customer/admin-all-customer";
import { AdminAddUserPage } from "../pages/admin-add-user/admin-add-user";
import { AdminUpdateUserPage } from "../pages/admin-update-user/admin-update-user";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}
export interface Item {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})

export class MyApp {


  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;
  appItems: Array<MenuItem>;
  id: any;
  user_email: any;
  fullname: any = localStorage.getItem('fullname');
  last_name: any = localStorage.getItem('last_name');
  phone: any;
  status: any;
  user_type: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {

    this.id = localStorage.getItem("user_id");
    this.user_email = localStorage.getItem("user_email");
    this.fullname = localStorage.getItem("fullname");
    this.last_name = localStorage.getItem("last_name");
    this.phone = localStorage.getItem("phone");
    this.status = localStorage.getItem("status");
    this.user_type = localStorage.getItem("user_type");

    this.initializeApp();

    if (localStorage.getItem('user_email')) {
      if (localStorage.getItem('user_type') == 'admin') {
        this.rootPage = AdminDashboardPage;
      } else {
        this.rootPage = HomePage;
      }
    } else {
      this.rootPage = ImagesliderPage;
    }

    /*this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'},      
      {title: 'My Bookings', component: BookingsPage, icon: 'calendar'},
      {title: 'My transactions', component: TransactionsPage,icon: 'swap'},
      {title: 'Schedule Appointment', component: BookingTripPage,icon: 'clock'}
      
    ];*/

   
    // this.appItems = [
    //   { title: 'Contact us', component: ContactusPage, icon: 'call' },
    //   { title: 'Feedback', component: FeedbackPage, icon: 'paper' }
    // ];
  }
  ionViewDidEnter() {
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      if (this.user_type == "admin") {
        this.appMenuItems = [
          { title: 'Home', component: AdminDashboardPage, icon: 'home' },
          { title: 'All Appointment', component: AdminNewAppointmentPage, icon: 'calendar' },
          { title: 'Add Staff/customer', component: AdminAddUserPage, icon: 'add' },
          { title: 'Update Staff/customer', component: AdminUpdateUserPage, icon: 'add' },
          { title: 'Staff List', component: AdminAllCustomerPage, icon: 'list' }
        ];
      }
      else if (this.user_type == "client") {
        this.appMenuItems = [
          { title: 'Home', component: HomePage, icon: 'home' },
          { title: 'My Bookings', component: BookingsPage, icon: 'calendar' },
          { title: 'My transactions', component: TransactionsPage, icon: 'swap' },
          { title: 'Schedule Appointment', component: BookingTripPage, icon: 'clock' }
  
        ];
        this.appItems = [
          { title: 'Contact us', component: ContactusPage, icon: 'call' },
          { title: 'Feedback', component: FeedbackPage, icon: 'paper' }
        ];
      } else {
        this.appMenuItems = [
          { title: 'Home', component: HomePage, icon: 'home' },
          { title: 'My Bookings', component: BookingsPage, icon: 'calendar' },
          { title: 'My transactions', component: TransactionsPage, icon: 'swap' }
        ];
        this.appItems = [
          { title: 'Contact us', component: ContactusPage, icon: 'call' },
          { title: 'Feedback', component: FeedbackPage, icon: 'paper' }
        ];
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad fnUserDetails');
  }

  openPage(page) {
    if (page.title == "Home") {
      this.nav.setRoot(page.component);
    } else if (page.title == "All Appointment") {

      this.nav.push(page.component,{from: "all"});
    
    }else if (page.title == "Staff List") {

      this.nav.push(page.component,{from: "staff"});
    
    }  else {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.push(page.component);
    }
  }

  closeSidebar() {
    this.nav.setRoot(HomePage);

  }

  logout() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }

  fnMyAccount() {
    this.nav.push(MyAccountPage);
  }

}
