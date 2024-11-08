import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  {Reservations } from "../models/reservations"
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // apiUrl = "https://airbnb-clone-backend-opal.vercel.app"
apiUrl = "http://localhost:3000"
constructor(private http: HttpClient) { }

getAllReservations():Observable<Reservations[]>{
  return this.http.get<Reservations[]>(`${this.apiUrl}/book`);
}

getMonthlyBookingsAndRevenue(year: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/book?year=${year}`);
}

}
