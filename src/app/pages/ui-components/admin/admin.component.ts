import { Component, OnInit } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminFormComponent } from '../admin-form/admin-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-admin',
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
    TranslateModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  displayedColumns1: string[] = ['assigned', 'name', 'email','country' ,'city', 'street', 'budget' ];
  dataSource1: any;
  page:any=1;
  loading:boolean=false;
  users: User[] = [];

  pageSize: number = 3;
  pageIndex: number = 0;

  constructor(private userService: UserService,
    private DomSanitizer:DomSanitizer,
    private dialog :MatDialog,
    private snackBar : MatSnackBar,
  ){}

  ngOnInit(): void {
    this.loading=true;
    this.userService.getAllUsers().subscribe((data)=>{
      let admins:any=[]
      admins = data;
      this.dataSource1 = admins.filter((admin: any)=>admin.roles == 'admin');
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

  loadingAdmin(){
    this.userService.getAllUsers().subscribe((data: Object)=>{
      const uss = data as User[];
      this.users = uss;
    }, (error) => {
      console.error('Error loading', error);
      this.snackBar.open('Error loading', 'Close', {
        duration: 3000,
      });
    });
  }


  onEdit(admin:User):void{
    console.log(admin);
    const dialogRef = this.dialog.open(AdminFormComponent, {
      width: '400px',
      data: { ...admin }
    });
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log(result._id);

        this.userService.updateAdmin(result._id, result).subscribe(
          ()=>{
            this.loadingAdmin()
            this.snackBar.open('Admin updated successfully' , "close" , {
              duration:3000,
            })
            window.location.reload()
          },
          (err)=>{
            console.error('Error In Update Admin' , err);
            this.snackBar.open('Admin updated successfully' , "close" , {
              duration:3000,
            })
          }
        );
      }
    }
  )
}

  addAdmin(){
    const dialogRef = this.dialog.open(AdminFormComponent , {
      width: '500px',
      height: '500px',
      data: {}
    })

    console.log(dialogRef)
    dialogRef.afterClosed().subscribe(result =>{
      console.log(result)
        if(result){
          this.userService.addAdmin(result).subscribe(
            ()=>{
              this.loadingAdmin()
              this.snackBar.open('Admin Added Successfully', 'Close', {
                duration: 3000,
              });
              window.location.reload()
            },
          (error) => {
            console.error('Error Adding Admin', error);
            this.snackBar.open('Error In Adding Admin', 'Close', {
              duration: 3000,
            });
          }
          );
        }
    }
    )
    }


  
  onpagechange(event:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedListing(): User[]{
    const start = this.pageIndex * this.pageSize
    return this.dataSource1.slice(start, start + this.pageSize)
  }
}


