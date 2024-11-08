import { Component, Inject, OnInit } from '@angular/core';
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
import { LanguageService} from 'src/app/services/dir.service'

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
export class AmenityFormComponent implements OnInit {

  amenityForm:FormGroup;
  isEditMode:boolean;

  isRtl:boolean = false

  constructor(
    private LanguageService:LanguageService,
    private FormBuild: FormBuilder,
    public dialogRef:MatDialogRef<AmenityFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Amenity
  ) {
    this.isEditMode = !!data && !!data._id

    this.amenityForm = this.FormBuild.group({
      _id: [data?._id ],

      name: this.FormBuild.group({
        en: [data?.name?.en || '', Validators.required],  // التأكد من وجود قيمة باللغة الإنجليزية
        ar: [data?.name?.ar || '', Validators.required],  // التأكد من وجود قيمة بالعربية
      }),

      description: this.FormBuild.group({
        en: [data?.description?.en || '', Validators.required],  // التأكد من وجود وصف باللغة الإنجليزية
        ar: [data?.description?.ar || '', Validators.required],  // التأكد من وجود وصف بالعربية
      }),
      icon: [data?.icon || '', Validators.required],  // التأكد من وجود أيقونة
    });
   }

   ngOnInit(){
    this.LanguageService.isRtl$.subscribe(isRlt=>{
      this.isRtl = isRlt
    })
   }

   onLanguageChange(lang: string) {
    this.LanguageService.changeLanguage(lang);
    this.LanguageService.setLanguageDirection(lang === 'ar');
  }


   onSave(): void {
    if(this.amenityForm.valid){
      this.dialogRef.close(this.amenityForm.value)

    }
  }


}
