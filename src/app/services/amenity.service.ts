import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from '../models/amenity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {
   apiurl = "https://airbnb-clone-backend-opal.vercel.app"

  constructor(private httpClient: HttpClient) { }



  getAllAmenitys(){
    return this.httpClient.get(`${this.apiurl}/amenity`)
  }

  removeAmenity(id:string){
    return this.httpClient.delete(`${this.apiurl}/amenity/${id}`)
  }

  addAmenity(amenity:Amenity){
    return this.httpClient.post(`${this.apiurl}/amenity` ,amenity)
  }

  editAmenity(id:string,editAmenity:any):Observable<any>{
    if(!id){
      console.log('id is undefined');
    }
    return this.httpClient.patch(`${this.apiurl}/${id}` ,editAmenity )
  }
}
