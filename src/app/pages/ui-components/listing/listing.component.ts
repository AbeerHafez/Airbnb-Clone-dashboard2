
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
  ],
   templateUrl: './listing.component.html',
})
export class listingComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: Listing[] = [];

  constructor(private ListingService: ListingService , private router:Router) {}

  ngOnInit() {
    this.ListingService.getAllListings().subscribe((data: Listing[]) => {
      this.dataSource1 = data;
      console.log(this.dataSource1);

    });
  }

  goToDetails(id:string):void {
    this.router.navigate(['ui-components/details',id])
  }




}

// export interface productsData {
//   id: number;
//   imagePath: string;
//   uname: string;
//   budget: number;
//   priority: string;
// }

// const PRODUCT_DATA: productsData[] = [
//   {
//     id: 1,
//     imagePath: 'assets/images/products/dash-prd-1.jpg',
//     uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
//     budget: 180,
//     priority: 'confirmed',
//   },
//   {
//     id: 2,
//     imagePath: 'assets/images/products/dash-prd-2.jpg',
//     uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
//     budget: 90,
//     priority: 'cancelled',
//   },
//   {
//     id: 3,
//     imagePath: 'assets/images/products/dash-prd-3.jpg',
//     uname: 'PlayStation 5 DualSense Wireless Controller',
//     budget: 120,
//     priority: 'rejected',
//   },
//   {
//     id: 4,
//     imagePath: 'assets/images/products/dash-prd-4.jpg',
//     uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
//     budget: 160,
//     priority: 'confirmed',
//   },
// ];
