import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastBookingsPage } from './past-bookings';

@NgModule({
  declarations: [
    PastBookingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PastBookingsPage),
  ],
})
export class PastBookingsPageModule {}
