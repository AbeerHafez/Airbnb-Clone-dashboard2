import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../../services/listing.service'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-RoomDetails',
  standalone: true,
  imports:[CommonModule,
     MatCardModule,
    MaterialModule,],
  templateUrl: './RoomDetails.component.html',
  styleUrls: ['./RoomDetails.component.css']
})
export class RoomDetailsComponent implements OnInit {

  listing:any

  constructor(private route:ActivatedRoute , private ListingService:ListingService ) { }

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('id') || ''
    this.getDetails(id);
  }

  getDetails(id:string):void{
    this.ListingService.getListingByID(id).subscribe((data)=>{
      this.listing = data
    })
  }

}
