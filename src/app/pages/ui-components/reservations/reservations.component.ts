import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservations } from 'src/app/models/reservations';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import {ReservationService } from '../../../services/reservation.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatPaginatorModule,TranslateModule,
    MatCardModule,MatTableModule,MaterialModule,
    CommonModule
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {

  displayedColumns1: string[] = ['_id','listing' , 'user','startDate','endDate','guests','totelPrice'];
  reservations:Reservations[]=[];

  pageSize:number=5;
  pageIndex:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ReservationService:ReservationService, private SnackBar:MatSnackBar ) { }

  ngOnInit(): void {
    this.loadingReservation()
  }

  loadingReservation(){
    this.ReservationService.getAllReservations().subscribe((data:Reservations[])=>{
      this.reservations = data;
      console.log(this.reservations);

    }, (error) => {
      console.error('Error loading reservations', error);
      this.SnackBar.open('Error loading reservations', 'Close', {
        duration: 3000,
      });
    });
  }


  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedReservations(): Reservations[] {
    const start = this.pageIndex * this.pageSize;
    return this.reservations.slice(start, start + this.pageSize);
  }
}
