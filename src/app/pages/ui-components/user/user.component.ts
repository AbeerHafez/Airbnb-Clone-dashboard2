import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
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
templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {

  displayedColumns1: string[] = ['assigned', 'name', 'email','country' ,'city', 'street', 'budget' ];
  dataSource1: any;
  page:any=1;
  loading:boolean=false;

  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loading=true;
    this.userService.getAllUsers().subscribe((data)=>{
      let allUsers:any=[]
      allUsers = data;
      this.dataSource1 = allUsers.filter((user: any)=>user.roles == 'user');
      this.loading=false;
    })
  }

  removeUser(id:string){
    Swal.fire({
      title: "Are You Sure to Delete This Item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor : "#e45555"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(()=>{
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


  // changePage(event:any){
  //   this.page = event;
  // }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedUser(): User[] {
    const start = this.pageIndex * this.pageSize;
    return this.dataSource1.slice(start, start + this.pageSize);
  }

}


