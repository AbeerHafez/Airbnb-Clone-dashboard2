import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';
import { ReviewsService } from 'src/app/services/reviews.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Reviews } from 'src/app/models/reviews';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule,
    SpinnerComponent,
    TranslateModule
  ],
templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit{

  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: any;
  page: any =1;
  loading:boolean=false;
  // total: any;
  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private reviewsService: ReviewsService){}

  ngOnInit() {
    this.loading=true;
    this.reviewsService.getAllReviews().subscribe((data)=>{
      this.dataSource1 = data;
      this.loading=false;
    })
  }

  // deleteReview(reviewID:string){
  //   let comfirmMsg = window.confirm('Are You Want To Delete This Review? ');
  //   if(comfirmMsg){
  //     this.reviewsService.deleteReview(reviewID).subscribe(()=>{
  //       this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != reviewID)
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: "Deleted Successfully",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       // Swal.fire({
  //       //   title: "Delete Review",
  //       //   text: "Deleted Successfully",
  //       //   icon: "success"
  //       // });
  //     })
  //   }
  // }
  deleteReview(reviewID:string){

    Swal.fire({
      title: "Are You Sure to Delete This Item?",
      customClass: {
        title: 'custom-title',
      },
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor : "#e45555"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewsService.deleteReview(reviewID).subscribe(()=>{
          this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != reviewID)
          Swal.fire({
            title: 'Deleted!',
            text: 'Your reviews has been deleted.',
            icon: 'success',
            iconColor: '#e45555',
            confirmButtonText: 'OK',
            confirmButtonColor: '#e45555',
          });
      })
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Error!',
          text: 'Error deleting reviews',
          icon: 'error',
          iconColor: '#000000',
          confirmButtonText: 'OK',
          confirmButtonColor: '#000000',
        });
      }
    }).catch((err)=>{
      Swal.fire({
        title: 'Error!',
        text: 'Error deleting reviews',
        icon: 'error',
        iconColor: '#000000',
        confirmButtonText: 'OK',
        confirmButtonColor: '#000000',
      });
    });

  }


  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  get paginatedReviews(): Reviews[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource1.slice(start, start + this.pageSize);
  }



}
