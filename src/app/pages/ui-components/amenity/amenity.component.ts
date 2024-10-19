import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { AmenityService } from 'src/app/services/amenity.service';

@Component({
  selector: 'app-amenity',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.scss'
})
export class AmenityComponent implements OnInit{

  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: any;

  constructor(private amenityService: AmenityService){}

  ngOnInit(): void {
    this.amenityService.getAllAmenitys().subscribe((data)=>{
      
      this.dataSource1 = data;

      console.log(data)
      // this.reviews = data;
    })
  }

}
