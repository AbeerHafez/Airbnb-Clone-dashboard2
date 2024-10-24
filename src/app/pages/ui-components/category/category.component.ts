import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service'
import {  Category } from '../../../models/category'

import { DomSanitizer , SafeHtml} from '@angular/platform-browser'
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
  ], 
   templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns1: string[] = ['icon','name' , 'budget'];
  categories: Category[] = [];
  constructor(private CategoryService:CategoryService,
    private DomSanitizer:DomSanitizer
   ) { }

  ngOnInit() {
    this.CategoryService.getAllCtegory().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(this.categories);

    });
      
  }


  getSanitizedSvg(svg:string):SafeHtml{
    return this.DomSanitizer.bypassSecurityTrustHtml(svg)
  }
}
