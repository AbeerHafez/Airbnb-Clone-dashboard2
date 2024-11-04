import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule , FormBuilder , FormGroup,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Amenity } from "src/app/models/amenity";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-AmenityForm',
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
  templateUrl: './AmenityForm.component.html',
  styleUrls: ['./AmenityForm.component.css']
})
export class AmenityFormComponent  {

  amenityForm:FormGroup;
  isEditMode:boolean;

  constructor(
    private FormBuild: FormBuilder,
    public dialogRef:MatDialogRef<AmenityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Amenity
  ) {
    this.isEditMode = !!data && !!data._id

    this.amenityForm= this.FormBuild.group({
      _id:[data?._id],
      name: [data?.name || '' , Validators.required],
      description: [data?.description || '' , Validators.required],
      icon: [data?.icon || '' , Validators.required],

    })
   }

   onSave(): void {
    if(this.amenityForm.valid){
      this.dialogRef.close(this.amenityForm.value)

    }
  }


}
