import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule , FormBuilder , FormGroup,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-adminForm',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    TranslateModule,
  ],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent  {
  adminForm:FormGroup;
  isEditMode:boolean;

  constructor(
    private FormBuild: FormBuilder,
    public dialogRef:MatDialogRef<AdminFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User
  ) {
    this.isEditMode = !!data && !!data._id

    this.adminForm= this.FormBuild.group({
      _id:[data?._id],
      firstName: [data?.firstName || '' ,[ Validators.required]],
      lastName: [data?.lastName || '' , [Validators.required]],
      email: [data?.email || '' , [Validators.required, Validators.email]],
      password: [data?.password || '' , [Validators.required]],
      image: [data?.image || 'https://res.cloudinary.com/dqrid1fi3/image/upload/v1729230344/kwrifwuycusuohxopa8j.jpg' ],
      roles: [data?.roles || 'admin' ],
      address: this.FormBuild.group({
        country: [data?.address?.country ||'', [Validators.required]],
        street: [data?.address?.street ||'',[ Validators.required]],
        city: [data?.address?.city || '',[ Validators.required]],
        zip: [data?.address?.zip || '', [Validators.required]]
      })
    })
   }

  onSave(): void {
    if(this.adminForm.valid){
      this.dialogRef.close(this.adminForm.value)
    }
  }



}
