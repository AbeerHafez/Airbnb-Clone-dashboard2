import { Component,OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReservationService } from 'src/app/services/reservation.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-revenue-product',
  standalone: true,
  imports: [TranslateModule,MaterialModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './revenue-product.component.html',
})
export class AppRevenueProductComponent implements OnInit {
  displayedColumns: string[] = ['assigned', 'priority', 'budget'];
  // dataSource = ELEMENT_DATA;
  popularListigs:any[]=[]

  constructor(private ReservationService:ReservationService) {}

  ngOnInit(){
    this.getMostPopularListing()
  }

  getMostPopularListing(){
    this.ReservationService.getAllReservations().subscribe((bookings)=>{
console.log('booking',bookings);



      const listingBookingMap:{[key:string]: any}={};

      bookings.forEach((booking)=>{
        const listingId = booking?.listingId?._id
        console.log('id',listingId);
        console.log('bookingDet',booking.listingId);


        if(!listingBookingMap[listingId]){
          listingBookingMap[listingId]={
            id:listingId,
            name:booking?.listingId?.title,
            price:booking?.listingId?.price,
            totalBooking:0
          }
        }
        listingBookingMap[listingId].totalBooking++;
        console.log('update booking',listingBookingMap);

      })

      const sortedListings = Object.values(listingBookingMap).sort((a,b)=>b.totalBooking - a.totalBooking)

      console.log('sortedListings',sortedListings);

      this.popularListigs = sortedListings.slice(0,3)
      console.log('popularListigs',this.popularListigs);

    })
  }
}
