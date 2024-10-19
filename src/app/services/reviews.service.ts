import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient: HttpClient) { }

  getAllReviews(){
    return this.httpClient.get('http://localhost:3000/review/')
  }

  deleteReview(id:string){
    return this.httpClient.delete(`http://localhost:3000/review/${id}`)
  }

}
