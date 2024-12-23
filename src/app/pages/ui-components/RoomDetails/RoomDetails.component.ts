import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ListingService } from '../../../services/listing.service'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { Listing } from 'src/app/models/listing';
import * as L from 'leaflet'
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-RoomDetails',
  standalone: true,
  imports:[CommonModule,
     MatCardModule,
    MaterialModule,
    TranslateModule,
    SpinnerComponent
  ],
  templateUrl: './RoomDetails.component.html',
  styleUrls: ['./RoomDetails.component.css']
})
export class RoomDetailsComponent implements OnInit   {

  listing:Listing
  currentPhotoIndex:number =0
  map:any

  loading:boolean=false;


  constructor(private route:ActivatedRoute , private ListingService:ListingService , private router :Router ) { }

  ngOnInit() {
    this.loading=true;

    const id  = this.route.snapshot.paramMap.get('id') || ''
    this.getDetails(id);
  }

  getDetails(id:string):void{
    this.ListingService.getListingByID(id).subscribe((data)=>{
      this.listing = data
      this.loading=false;

      console.log(this.listing);
      console.log(typeof this.listing.category);

      this.currentPhotoIndex=0
      if(this.listing && this.listing.location){
        setTimeout(()=>{
          this.initMap(this.listing.location.latitude, this.listing.location.longitude)

        },1)
      }
    })
  }

  deleteroom(id:string):void{
    if(confirm('Are you sure you want to delete this listing?')){
      this.ListingService.deleteListing(id).subscribe(()=>{
        Swal.fire({
          title: 'Deleted!',
          text: 'listing deleted successfully.',
          icon: 'success',
          iconColor: '#e45555',
          confirmButtonText: 'OK',
          confirmButtonColor: '#e45555',
        });
        this.router.navigate(['ui-components/listing'])
      }, error=>{
      console.error('error deleting listing',error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error deleting the listing',
        icon: 'error',
        iconColor: '#000000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#000000',
      });

    })
    }
  }

next():void{
  if(this.listing.photos && this.currentPhotoIndex < this.listing.photos.length -1){
    this.currentPhotoIndex++;
  }else {
    this.currentPhotoIndex=0
  }
}

previous():void{
  if(this.listing.photos && this.currentPhotoIndex > 0){
    this.currentPhotoIndex--;
  }else{
    this.currentPhotoIndex = this.listing.photos.length-1
  }
}


getCurrentPhoto(){
  return this.listing.photos ? this.listing.photos[this.currentPhotoIndex] :""
}


initMap(lat: number, lng: number): void {
  try {
    this.map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);  


    L.Icon.Default.imagePath = 'assets/images/images/';

    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup('Room location').openPopup();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 2);
  } catch (error) {
    console.error('Error initializing map:', error);
    // Handle error gracefully, e.g., display an error message to the user
  }
}


}
