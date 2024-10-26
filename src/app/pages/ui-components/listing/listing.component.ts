
import { CommonModule } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ListingService } from '../../../services/listing.service'
import { Listing } from 'src/app/models/listing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    TranslateModule,

  ],
   templateUrl: './listing.component.html',
})
export class listingComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: Listing[] = [];

  constructor(private ListingService: ListingService , private router:Router) {}

  ngOnInit() {
    this.ListingService.getAllListings().subscribe((data: Listing[]) => {
      this.dataSource1 = data.filter(listing => listing.verified === true);
      console.log(this.dataSource1);

    });
  }

  goToDetails(id:string):void {
    this.router.navigate(['ui-components/details',id])
  }

  deleteroom(id:string):void{
    if(confirm('Are you sure you want to delete this listing?')){
      this.ListingService.deleteListing(id).subscribe(()=>{
        alert('listing deleted successfully')
        this.dataSource1 = this.dataSource1.filter(listing =>listing._id !== id)
      }, error=>{
      console.error('error deleting listing',error);
      alert('There was an error deleting the listing')

    })
    }
  }

}
