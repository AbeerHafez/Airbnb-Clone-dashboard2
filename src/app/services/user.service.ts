import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get('http://localhost:3000/user/')
  }
  
  updateAdmin(id: string, editAdmin: any): Observable<any> {
    if (!id) {
      console.error('Cannot update category: ID is undefined');
      return throwError('ID is undefined');
    }
    else{
      return this.httpClient.patch(`http://localhost:3000/user/${id}`, editAdmin);
    }
  }

  addAdmin(newAdmin:User):Observable<User>{
    return this.httpClient.post<User>('http://localhost:3000/user/', newAdmin)
  }

  deleteUser(id:string){
    return this.httpClient.delete(`http://localhost:3000/user/${id}`)
  }



}
