import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule , FormBuilder , FormGroup,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Category } from 'src/app/models/category';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService} from 'src/app/services/dir.service'

@Component({
  selector: 'app-categoryForm',
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
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./categoryForm.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm:FormGroup;
  isEditMode:boolean;

  isRtl:boolean = false


  constructor(
    private LanguageService:LanguageService,
    private FormBuild: FormBuilder,
    public dialogRef:MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Category
  ) {
    this.isEditMode = !!data && !!data._id

    this.categoryForm= this.FormBuild.group({
      _id:[data?._id ],
      displayName: this.FormBuild.group({
        en:[data?.displayName?.en || '' , Validators.required],
        ar:[data?.displayName?.ar || '' , Validators.required],
      }),
      technicalName: [data?.technicalName || '' , Validators.required],
      icon: [data?.icon || '' , Validators.required],
      show: [data?.show || false ]

    })
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
    if(this.categoryForm.valid){
      this.dialogRef.close(this.categoryForm.value)

    }
  }

}
