import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://airbnb-clone-backend-opal.vercel.app"


  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get(`${this.apiUrl}/user`)
  }

  updateAdmin(id: string, editAdmin: any): Observable<any> {
    if (!id) {
      console.error('Cannot update category: ID is undefined');
      return throwError('ID is undefined');
    }
    else{
      return this.httpClient.patch(`${this.apiUrl}/user/${id}`, editAdmin);
    }
  }

  addAdmin(newAdmin:User):Observable<User>{
    return this.httpClient.post<User>('${this.apiUrl}/user/', newAdmin)
  }

  deleteUser(id:string){
    return this.httpClient.delete(`${this.apiUrl}/user/${id}`)
  }



}
