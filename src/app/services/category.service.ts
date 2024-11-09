import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
// apiUrl = "https://airbnb-clone-backend-opal.vercel.app/category"
apiUrl="http://localhost:3000/category"

constructor(private http: HttpClient) { }

getAllCtegory() : Observable<Category[]> {
  return this.http.get<Category[]>(this.apiUrl);
}

addCategory(category:Category){
  return this.http.post(this.apiUrl, category)
}



updateCatecory(id: string, updateCatecory: any): Observable<any> {
  if (!id) {
    console.error('Cannot update category: ID is undefined');
    return throwError('ID is undefined');
  }
  return this.http.patch(`${this.apiUrl}/${id}`, updateCatecory);
}

deleteCategory(id:string):Observable<any>{
  return this.http.delete(`${this.apiUrl}/${id}`)
}

}

