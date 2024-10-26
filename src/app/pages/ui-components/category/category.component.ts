import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service'
import {  Category } from '../../../models/category'
import { CategoryFormComponent } from '../categoryForm/categoryForm.component'
import { DomSanitizer , SafeHtml} from '@angular/platform-browser'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    CategoryFormComponent,
  ],
   templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns1: string[] = ['icon','name' , 'budget'];
  categories: Category[] = [];
  isEditing=false;
  editedCategory: Category = {} as Category;

  constructor(private CategoryService:CategoryService,
    private DomSanitizer:DomSanitizer,
    private dialog :MatDialog,
    private snackBar : MatSnackBar
   ) { }

  ngOnInit() {
this.loadingCategory()

  }

  loadingCategory(){
    this.CategoryService.getAllCtegory().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);

    }, (error) => {
      console.error('Error loading categories', error);
      this.snackBar.open('Error loading categories', 'Close', {
        duration: 3000,
      });
    });
  }


  getSanitizedSvg(svg:string):SafeHtml{
    return this.DomSanitizer.bypassSecurityTrustHtml(svg)
  }

  onAddCategory():void{
    const dialogRef = this.dialog.open(CategoryFormComponent , {
      width: '400px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.CategoryService.addCategory(result).subscribe(
          ()=>{
          this.loadingCategory()
          this.snackBar.open('Category added successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error adding category', error);
          this.snackBar.open('Error adding category', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  })
      }

  onEditCategory(category:Category):void{
    console.log(category._id);

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      data: { ...category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log(result._id);

        this.CategoryService.updateCatecory(result._id, result).subscribe(
          ()=>{
         this.loadingCategory()
         this.snackBar.open('Category update successfully' , "close" , {
          duration:3000,
         })
        },
          (error)=>{
            console.error('error update' , error);
            this.snackBar.open('Category update successfully' , "close" , {
              duration:3000,
             })

          }
        );
      }
    });}

    onDeleteCategory(id: string): void {
      if (confirm('Are you sure you want to delete this category?')) {
        this.CategoryService.deleteCategory(id).subscribe(
          () => {
            this.loadingCategory();
            this.snackBar.open('Category deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Error deleting category', error);
            this.snackBar.open('Error deleting category', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    }
  }
