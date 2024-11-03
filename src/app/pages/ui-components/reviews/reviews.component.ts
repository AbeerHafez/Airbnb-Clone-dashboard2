import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor : "#e45555"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewsService.deleteReview(reviewID).subscribe(()=>{
          this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != reviewID)
          Swal.fire("Deleted!", "", "success");
      })
      } else if (result.isDismissed) {
        Swal.fire("Deleted Canseled", "", "info");
      }
    }).catch((err)=>{
      Swal.fire("Error", "", "error")
    });
    
  }

  changePage(event:any){
    this.page = event;
  }
 
}
