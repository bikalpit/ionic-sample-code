import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingBookingsPage } from './upcoming-bookings';

@NgModule({
  declarations: [
    UpcomingBookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingBookingsPage),
  ],
})
export class UpcomingBookingsPageModule {}
