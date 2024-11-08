import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing'


@Injectable({
  providedIn: 'root'
})
export class ListingService {
  // apiUrl = "https://airbnb-clone-backend-opal.vercel.app"
apiUrl = "http://localhost:3000"

constructor(private http: HttpClient) { }

getAllListings(): Observable<Listing[]> {
  return this.http.get<Listing[]>(`${this.apiUrl}/listing`);
}

getListingByID(id:string):Observable<Listing>{
  return this.http.get<Listing>(`${this.apiUrl}/listing/${id}`)
}

verifayListing(id:string):Observable<any>{
  return this.http.put(`${this.apiUrl}/listing/${id}`,{verified:true})
}

deleteListing(id:string){
  return this.http.delete(`${this.apiUrl}/listing/${id}`)
}
}
