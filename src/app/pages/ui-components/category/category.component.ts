import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CategoryFormComponent } from '../categoryForm/categoryForm.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';

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
    TranslateModule,
    MatPaginatorModule,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  displayedColumns1: string[] = ['icon', 'name', 'show', 'budget'];
  categories: Category[] = [];
  isEditing = false;
  editedCategory: Category = {} as Category;

  pageSize: number = 5;
  pageIndex: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private CategoryService: CategoryService,
    private DomSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadingCategory();
  }

  loadingCategory() {
    this.CategoryService.getAllCtegory().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error loading categories', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error loading categories',
          icon: 'error',
          iconColor: '#000000',
          confirmButtonText: 'OK',
          confirmButtonColor: '#000000',
        });
      }
    );
  }

  getSanitizedSvg(svg: string): SafeHtml {
    return this.DomSanitizer.bypassSecurityTrustHtml(svg);
  }

  onAddCategory(): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CategoryService.addCategory(result).subscribe(
          () => {
            this.loadingCategory();
            Swal.fire({
              title: 'Add!',
              text: 'Category added successfully.',
              icon: 'success',
              iconColor: '#e45555',
              confirmButtonText: 'OK',
              confirmButtonColor: '#e45555',
            });
          },
          (error) => {
            console.error('Error adding category', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error adding category',
              icon: 'error',
              iconColor: '#000000',
              confirmButtonText: 'OK',
              confirmButtonColor: '#000000',
            });
          }
        );
      }
    });
  }

  onEditCategory(category: Category): void {
    console.log(category._id);

    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '400px',
      data: { ...category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        console.log(result._id);

        this.CategoryService.updateCatecory(result._id, result).subscribe(
          () => {
            this.loadingCategory();
            Swal.fire({
              title: 'update!',
              text: 'Category update successfully.',
              icon: 'success',
              iconColor: '#e45555',
              confirmButtonText: 'OK',
              confirmButtonColor: '#e45555',
            });
          },
          (error) => {
            console.error('error update', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error update category',
              icon: 'error',
              iconColor: '#000000',
              confirmButtonText: 'OK',
              confirmButtonColor: '#000000',
            });
          }
        );
      }
    });
  }

  onDeleteCategory(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete this category?',
      customClass: {
        title: 'custom-title',
      },
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e45555',
    }).then((result) => {
      if (result.isConfirmed) {
        this.CategoryService.deleteCategory(id).subscribe(
          () => {
            this.loadingCategory();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your category has been deleted.',
              icon: 'success',
              iconColor: '#e45555',
              confirmButtonText: 'OK',
              confirmButtonColor: '#e45555',
            });
          },
          (error) => {
            console.error('Error deleting category', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error deleting category',
              icon: 'error',
              iconColor: '#000000',
              confirmButtonText: 'OK',
              confirmButtonColor: '#000000',
            });
          }
        );
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedCategories(): Category[] {
    const start = this.pageIndex * this.pageSize;
    return this.categories.slice(start, start + this.pageSize);
  }
}
