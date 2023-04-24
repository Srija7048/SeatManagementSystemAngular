import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatComponent } from './seat/seat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookseatService } from './bookseat.service';


@NgModule({
  declarations: [
    AppComponent,
    SeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookseatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
