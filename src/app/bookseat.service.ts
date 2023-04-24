import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type SEAT_ROW = {
  row: number;
  rowbooked: number;
  rowmax: number;
  rowstart: number;
  rowbooked_seats: number[];
};

type DATASTORE = {
  seatChart: SEAT_ROW[];
  total: number;
  booked: number;
  remaining: number;
};
@Injectable({
  providedIn: 'root'
})
export class BookseatService {

  constructor() { }
  private dataStore: DATASTORE = {
    seatChart: [
      { row: 1, rowbooked: 1, rowmax: 7, rowstart: 1, rowbooked_seats: [3] },
      { row: 2, rowbooked: 0, rowmax: 7, rowstart: 8, rowbooked_seats: [] },
      { row: 3, rowbooked: 0, rowmax: 7, rowstart: 15, rowbooked_seats: [] },
      { row: 4, rowbooked: 0, rowmax: 7, rowstart: 22, rowbooked_seats: [] },
      { row: 5, rowbooked: 0, rowmax: 7, rowstart: 29, rowbooked_seats: [] },
      { row: 6, rowbooked: 2, rowmax: 7, rowstart: 36, rowbooked_seats: [38,40] },
      { row: 7, rowbooked: 0, rowmax: 7, rowstart: 43, rowbooked_seats: [] },
      { row: 8, rowbooked: 0, rowmax: 7, rowstart: 50, rowbooked_seats: [] },
      { row: 9, rowbooked: 0, rowmax: 7, rowstart: 57, rowbooked_seats: [] },
      { row: 10, rowbooked: 0, rowmax: 7, rowstart: 64, rowbooked_seats: [] },
      { row: 11, rowbooked: 0, rowmax: 7, rowstart: 71, rowbooked_seats: [] },
      { row: 12, rowbooked: 0, rowmax: 3, rowstart: 78, rowbooked_seats: [] }
    ],
    total: 80,
    booked: 3,
    remaining: 77
  };
  bookings=[];
  private _data = new BehaviorSubject<DATASTORE>(this.dataStore);
  get data() {
    return this._data.asObservable();
  }


  bookseats(seatstobook:any){
    let remaining=seatstobook;
    let bookedseats=[];
    for(let row of this.dataStore.seatChart){
      if(remaining==0){
        break;
      }
      const rowBookings=Math.min(row.rowmax-row.rowbooked,remaining);
      remaining-=rowBookings;
      const bs=row.rowbooked_seats;
      let count=0;
      for(let i=row.rowstart;i<=row.rowstart+row.rowmax;i++){
        if(count==rowBookings){
          break;
        }
        const alreadyBooked=bs.some(n=>n===i);
        if(!alreadyBooked){
          count++;
          bs.push(i);
          bookedseats.push(i);
        }
      }
    }
    this.dataStore.booked+=Number(seatstobook);
    this.dataStore.remaining=Number(this.dataStore.total)-Number(this.dataStore.booked);
    this._data.next(this.dataStore);
    return [bookedseats,this.dataStore.remaining];
  }

  updatedata(seats:any){
    for(let i of seats){
      let row1=Math.floor(i/8);
      this.dataStore.seatChart[row1].rowbooked+=1;
      console.log(this.dataStore.seatChart[row1],i);
      this._data.next(this.dataStore);
      console.log(this._data.value)

    }

  }
}
