import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { ReviewsService } from 'src/app/services/reviews.service';
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
    TranslateModule
  ],
templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit{
  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: any;
  // reviews:any

  constructor(private reviewsService: ReviewsService){}

  ngOnInit() {
    this.reviewsService.getAllReviews().subscribe((data)=>{
      
      this.dataSource1 = data;

      console.log(data)
      // this.reviews = data;
    })
  }

  deleteReview(reviewID:string){
    console.log(reviewID)
    this.reviewsService.deleteReview(reviewID)
  }

}
