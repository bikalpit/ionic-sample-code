import {Injectable} from "@angular/core";
import {TRIPS} from "./mock-trips";
import {BOOKINGS} from "./mock-bookings";

@Injectable()
export class TripService {
  private trips: any;
  private bookings: any;

  constructor() {
    this.trips = TRIPS;
    this.bookings = BOOKINGS;
  }

  getAll() {
    return this.trips;
  }
  getBookings(){
    return this.bookings;
  }

  getItem(id) {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i].id === parseInt(id)) {
        return this.trips[i];
      }
    }
    return null;
  }

  remove(item) {
    this.trips.splice(this.trips.indexOf(item), 1);
  }
}
