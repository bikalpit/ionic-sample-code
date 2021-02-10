import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';


import {MyApp} from "./app.component";
import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";



import {BookingTripPage} from "../pages/booking-trip/booking-trip";
import { MyBookingsPage } from "../pages/my-bookings/my-bookings";
import { BookingsPage } from "../pages/bookings/bookings";
import { PastBookingsPage } from "../pages/past-bookings/past-bookings";
import { UpcomingBookingsPage } from "../pages/upcoming-bookings/upcoming-bookings";
import { MyAccountPage } from "../pages/my-account/my-account";
import { ProfilePage } from "../pages/profile/profile";
import { ChangePasswordPage } from "../pages/change-password/change-password";
import { ForgetPasswordPage } from "../pages/forget-password/forget-password";
import { TransactionsPage } from "../pages/transactions/transactions";
import { ViewDetailPage } from "../pages/view-detail/view-detail";
import { ContactusPage } from "../pages/contactus/contactus";
import { FeedbackPage } from "../pages/feedback/feedback";


import { ImagesliderPage } from "../pages/imageslider/imageslider";

import { DatePipe } from '@angular/common';

import { AdminDashboardPage } from "../pages/admin-dashboard/admin-dashboard";
import { AdminNewAppointmentPage } from "../pages/admin-new-appointment/admin-new-appointment";
import { AdminViewDetailsAppointmentPage } from "../pages/admin-view-details-appointment/admin-view-details-appointment";
import { AdminAllCustomerPage } from "../pages/admin-all-customer/admin-all-customer";
import { AdminSelectStaffPage } from '../pages/admin-select-staff/admin-select-staff';
import { AdminAddUserPage } from "../pages/admin-add-user/admin-add-user";
import { AdminUpdateUserPage } from "../pages/admin-update-user/admin-update-user";

/*import { GlobalProvider } from '../pages//providers/global/global';*/
// import services
// end import services
import { ServicesProvider } from '../providers/services';
import { GlobalmethodProvider } from '../providers/globalmethod/globalmethod';
import { GlobaMethodProvider } from '../providers/globa-method/globa-method'; 

// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,    
    HomePage,
    LoginPage,    
    NotificationsPage,
    RegisterPage,
    AdminDashboardPage,
    BookingTripPage,
    BookingsPage,
    MyBookingsPage,
    PastBookingsPage,
    UpcomingBookingsPage,
    MyAccountPage,
    ProfilePage,
    ChangePasswordPage,
    ForgetPasswordPage,
    TransactionsPage,
   ContactusPage,
   FeedbackPage,
   ImagesliderPage,
   AdminNewAppointmentPage,
   AdminViewDetailsAppointmentPage,
   AdminAllCustomerPage,
   AdminSelectStaffPage,
   AdminUpdateUserPage,
   AdminAddUserPage,
    ViewDetailPage  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    AdminDashboardPage,
    HomePage,
    LoginPage,    
    NotificationsPage,
    RegisterPage,    
    BookingTripPage,
    BookingsPage,
    MyBookingsPage,
    PastBookingsPage,
    UpcomingBookingsPage,
    MyAccountPage,
    ContactusPage,
    ProfilePage,
    ChangePasswordPage,
    FeedbackPage,
    ImagesliderPage,
    ForgetPasswordPage,
    TransactionsPage,
    AdminNewAppointmentPage,
    AdminViewDetailsAppointmentPage,
    AdminAllCustomerPage,
    AdminSelectStaffPage,
    AdminUpdateUserPage,
    AdminAddUserPage,
    ViewDetailPage
  ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    Keyboard,   
    DatePipe, 
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesProvider,
    GlobalmethodProvider,
    GlobaMethodProvider

  ]
})

export class AppModule {
}
