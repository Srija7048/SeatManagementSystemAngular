import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookseatService } from '../bookseat.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  constructor(private bookservice:BookseatService,private fb:FormBuilder){}

  resseats:any;
  @Input() noofseats:number=0;
  seatnumber=new FormControl(0,Validators.required);
  bookingform!:FormGroup;
  ifavailable:boolean=true;
  public data!: Observable<any>;
  remaining:any=0;
  bookings:any;
  bookedseats=[];
  public sevenSeater = [1, 2, 3, 4, 5, 6, 7];
  public threeSeater = [1, 2, 3];

  ngOnInit(): void {
    this.createForm();
    this.data=this.bookservice.data.pipe(tap(d=>(this.remaining=d.remaining)))
  }

  createForm(){
    this.bookingform=this.fb.group({noofseats:['',Validators.required]});
  }

  getSeatNum(n: number, row: number): number {
    return (row - 1) * 7 + n;
  }

  checkBook(n: number, row: number, bs: number[]): boolean {
    const seat = this.getSeatNum(n, row);
    return bs.some(bs => bs === seat);
  }

  sendvalue(){
    this.ifavailable=false;
  }

  selectseats(){
    this.resseats=this.bookservice.bookseats(this.noofseats);
    this.remaining=this.resseats[1];
    this.bookedseats=this.resseats[0];
    let books=[];
    books.unshift({time:Date.now(),seats:this.bookedseats});
    this.bookings=books;
    console.log(this.bookedseats);
    this.bookservice.updatedata(this.bookedseats);



  }
}
