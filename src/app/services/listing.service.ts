import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing'


@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:3000/listing'; // URL الخاص بـ API

constructor(private http: HttpClient) { }

getAllListings(): Observable<Listing[]> {
  return this.http.get<Listing[]>(this.apiUrl);
}

getListingByID(id:string):Observable<Listing>{
  return this.http.get<Listing>(`${this.apiUrl}/${id}`)
}

deleteListing(id:string){
  return this.http.delete(`${this.apiUrl}/${id}`)
}
}
