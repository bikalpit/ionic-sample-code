import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingTripPage } from './booking-trip';

@NgModule({
  declarations: [
    BookingTripPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingTripPage),
  ],
})
export class BookingTripPageModule {}
