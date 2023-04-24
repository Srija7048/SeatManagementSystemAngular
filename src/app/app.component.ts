import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeatManagement';
  ifsubmit:boolean=false;
  noofseats:any=0;
  seats=new FormControl('',Validators.required);
  submit(){
    this.ifsubmit=true;
    this.noofseats=this.seats.value
    // console.log(this.noofseats);

  }
}
