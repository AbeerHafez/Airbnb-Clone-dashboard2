import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  // apiUrl = "https://airbnb-clone-backend-opal.vercel.app"
apiUrl = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  getAllReviews(){
    return this.httpClient.get(`${this.apiUrl}/review/`)
  }

  deleteReview(id:string){
    return this.httpClient.delete(`${this.apiUrl}/review/${id}`)
  }

}
