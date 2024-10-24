import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
}
