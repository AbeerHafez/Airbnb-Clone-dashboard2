import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';
import { AmenityService } from 'src/app/services/amenity.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-amenity',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    NgxPaginationModule,
    SpinnerComponent,
    TranslateModule
  ],
templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.scss'
})
export class AmenityComponent implements OnInit{

  displayedColumns1: string[] = ['assigned', 'name', 'address', 'budget'];
  dataSource1: any;
  page:any=1;
  loading:boolean=false;

  constructor(private amenityService: AmenityService){}

  ngOnInit(): void {
    this.loading=true;
    this.amenityService.getAllAmenitys().subscribe((data)=>{
      this.dataSource1 = data;
      this.loading=false;
    })
  }

  // removeAmenity(id:string){
  //   let comfirmMsg = window.confirm('Are You Want To Delete This Amenity? ');
  //   if(comfirmMsg){
  //     this.amenityService.removeAmenity(id).subscribe(()=>{
  //       this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != id)
  //       Swal.fire({
  //         title: "Delete Amenity",
  //         text: "Deleted Successfully",
  //         icon: "success"
  //       });
  //     })
  //   }
  // }
  removeAmenity(id:string){

    Swal.fire({
      title: "Are You Sure to Delete This Item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor : "#e45555"
    }).then((result) => {
      if (result.isConfirmed) {
        this.amenityService.removeAmenity(id).subscribe(()=>{
          this.dataSource1 = this.dataSource1.filter((ele:any)=>ele._id != id)
          Swal.fire("Deleted!", "", "success");
      })
      } else if (result.isDismissed) {
        Swal.fire("Deleted Canseled", "", "info");
      }
    }).catch((err)=>{
      Swal.fire("Error", "", "error")
    });
  }


  changePage(event:any){
    this.page = event;
  }


}
