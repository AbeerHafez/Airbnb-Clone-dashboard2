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
      this.dataSource1 = data.filter((listing) => listing.verified === true).map((listing)=>({
        ...listing,
        title: this.translate.instant(`title.${listing.title}`)
        }));
      console.log(this.dataSource1);
    })
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

  onpagechange(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedListing(): Listing[]{
    const start = this.pageIndex * this.pageSize
    return this.dataSource1.slice(start, start + this.pageSize)
  }

}




// import { CommonModule } from '@angular/common';
// import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MaterialModule } from 'src/app/material.module';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatButtonModule } from '@angular/material/button';
// import { ListingService } from '../../../services/listing.service';
// import { Listing } from 'src/app/models/listing';
// import { Router } from '@angular/router';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { PageEvent } from '@angular/material/paginator';
// import { LanguageService  } from "../../../services/dir.service"
// @Component({
//   selector: 'app-listing',
//   standalone: true,
//   imports: [
//     MatTableModule,
//     CommonModule,
//     MatCardModule,
//     MaterialModule,
//     MatIconModule,
//     MatMenuModule,
//     MatButtonModule,
//     TranslateModule,
//     MatPaginatorModule,
//   ],
//   templateUrl: './listing.component.html',
// })
// export class listingComponent implements OnInit {
//   displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
//   dataSource1: Listing[] = [];
//   pageSize: number = 3;
//   pageIndex: number = 0;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(
//     private listingService: ListingService,
//     private router: Router,
//     private translate: TranslateService,
//     private languageService: LanguageService
//   ) {}

//   ngOnInit() {
//     this.fetchListings();
//     this.languageService.currentLanguage.subscribe(() => {
//       this.updateTitles(); // تحديث العناوين عند تغيير اللغة
//     });
//   }


//   fetchListings() {
//     this.listingService.getAllListings().subscribe((data: Listing[]) => {
//       this.dataSource1 = data.filter((listing) => listing.verified === true);
//       console.log(this.dataSource1);
//       // this.updateTitles(); // تحديث العناوين بعد تحميل البيانات
//     });
//   }

//   updateTitles() {
//     this.dataSource1.forEach(listing => {
//       // استخدم العنوان كمفتاح مباشرة
//       const translatedTitle = this.translate.instant(`title.${listing.title}`);

//       // تحقق مما إذا كانت الترجمة متاحة
//       if (translatedTitle !== `title.${listing.title}`) {
//         listing.title = translatedTitle; // تحديث العنوان إلى القيمة المترجمة
//       } else {
//         // إذا لم يتم العثور على الترجمة، يمكن الحفاظ على العنوان كما هو أو تعيين قيمة افتراضية
//         console.warn(`Translation not found for: title.${listing.title}`);
//       }
//     });
//   }



//   goToDetails(id: string): void {
//     this.router.navigate(['ui-components/details', id]);
//   }

//   deleteroom(id: string): void {
//     if (confirm('Are you sure you want to delete this listing?')) {
//       this.listingService.deleteListing(id).subscribe(() => {
//         alert('Listing deleted successfully');
//         this.dataSource1 = this.dataSource1.filter(listing => listing._id !== id);
//       }, error => {
//         console.error('Error deleting listing', error);
//         alert('There was an error deleting the listing');
//       });
//     }
//   }

//   onpagechange(event: PageEvent) {
//     this.pageIndex = event.pageIndex;
//     this.pageSize = event.pageSize;
//   }

//   get paginatedListing(): Listing[] {
//     const start = this.pageIndex * this.pageSize;
//     return this.dataSource1.slice(start, start + this.pageSize);
//   }
// }

