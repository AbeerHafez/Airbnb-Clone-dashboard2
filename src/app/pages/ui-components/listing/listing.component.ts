import { CommonModule } from '@angular/common';
import { Component ,OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

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
    MatPaginatorModule,
  ],
   templateUrl: './listing.component.html',
})
export class listingComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: Listing[] = [];

  pageSize: number = 3;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ListingService: ListingService , private router:Router ,private translate: TranslateService) {}

  ngOnInit() {
    this.ListingService.getAllListings().subscribe((data: Listing[]) => {
      this.dataSource1 = data.filter((listing) => listing.verified === true)
      console.log(this.dataSource1);
        })
    }
    

  goToDetails(id:string):void {
    this.router.navigate(['ui-components/details',id])
  }

  deleteroom(id:string):void{
    Swal.fire({
      title: 'Are you sure you want to delete this listing?',
      customClass: {
        title: 'custom-title',
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e45555',
    }).then((result) => {
      if (result.isConfirmed) {
       this.ListingService.deleteListing(id).subscribe(
        ()=>{
        Swal.fire({
          title: 'Deleted!',
          text: 'listing deleted successfully.',
          icon: 'success',
          iconColor: '#e45555',
          confirmButtonText: 'OK',
          confirmButtonColor: '#e45555',
        });
        this.dataSource1 = this.dataSource1.filter(listing =>listing._id !== id)
      }, error=>{
      console.error('error deleting listing',error);
      Swal.fire({
        title: 'Error!',
        text: 'Error deleting listing',
        icon: 'error',
        iconColor: '#000000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#000000',
      });
    })
    }
  })}

  onpagechange(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedListing(): Listing[]{
    const start = this.pageIndex * this.pageSize
    return this.dataSource1.slice(start, start + this.pageSize)
  }

}