import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from '../models/amenity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  constructor(private httpClient: HttpClient) { }


  getAllAmenitys(){
    return this.httpClient.get(`http://localhost:3000/amenity`)
  }

  removeAmenity(id:string){
    return this.httpClient.delete(`http://localhost:3000/amenity/${id}`)
  }

  addAmenity(amenity:Amenity){
    return this.httpClient.post(`http://localhost:3000/amenity` ,amenity)
  }

  editAmenity(id:string,editAmenity:any):Observable<any>{
    if(!id){
      console.log('id is undefined');
    }
    return this.httpClient.patch(`http://localhost:3000/amenity/${id}` ,editAmenity )
  }
}
