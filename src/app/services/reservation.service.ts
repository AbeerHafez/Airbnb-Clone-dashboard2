import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  {Reservations } from "../models/reservations"
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/book'; // URL الخاص بـ API

constructor(private http: HttpClient) { }

getAllReservations():Observable<Reservations[]>{
  return this.http.get<Reservations[]>(this.apiUrl);
}

getMonthlyBookingsAndRevenue(year: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?year=${year}`);
}

}
