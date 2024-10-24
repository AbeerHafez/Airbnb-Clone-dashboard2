import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private apiUrl = 'http://localhost:3000/category';
constructor(private http: HttpClient) { }

getAllCtegory() : Observable<Category[]> {
  return this.http.get<Category[]>(this.apiUrl);
}



// editCatecory(id:string){
//   return this.http.patch(`${this.apiUrl}/${id}`)
// }

}

// import { Listing } from '../models/listing'