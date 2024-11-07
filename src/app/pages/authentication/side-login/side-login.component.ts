import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get getEmail(){
    return this.form.controls.email
  }
  get getPassword(){
    return this.form.controls.password
  }
  login() {
  
    const credentials = {
      email: this.form.get('email')?.value as string,
      password: this.form.get('password')?.value as string,
    };
    this.authService.login(credentials).subscribe(
        (res) => {
            console.log(res)
            console.log(this.authService.isAdmin())
            if (this.authService.isAdmin()) {

              const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Loged in successfully"
              });

              this.router.navigate(['/dashboard']);
            }
        },
        (error)=>{
            // console.log(error.error.message)
            // alert(error.error.message)
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "error",
              title: error.error.message + ' Please Tray Again..'
            });
            this.form.reset()
        }
    );
  }




}
