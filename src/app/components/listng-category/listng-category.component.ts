import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../../material.module';
import { CategoryService } from 'src/app/services/category.service';
import { ListingService } from 'src/app/services/listing.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-listng-category',
  standalone: true,
  imports: [NgApexchartsModule,MaterialModule,TranslateModule],
  templateUrl: './listng-category.component.html',
  styleUrls: ['./listng-category.component.css'],
})
export class ListngCategoryComponent implements OnInit{
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any;


  constructor(private CategoryService:CategoryService,private ListingService:ListingService ) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'donut',
        height: 330,
      },
      labels: [],
      colors:['#FF0000', '#8B0000', '#B22222','#CD5C5C','#F08080','#800000',
        '#A52A2A','#DC143C','#CD5C5C','#E9967A','#FA8072','#FFA07A',
        '#FFEFD5','#FFE4B5','#FFDAB9',
        '#EEE8AA','#BDB76B'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(){
this.getChatData()
  }

  getChatData(){
    this.CategoryService.getAllCtegory().subscribe((categories)=>{
      this.ListingService.getAllListings().subscribe((listings)=>{
        const categoryCount = categories.map(category=>{
          const count = listings.filter(
            (listing)=>listing?.category?._id === category._id).length;
          return{ category:category.technicalName,count:count}

        })

        this.chartOptions.labels = categoryCount.map(item=>item.category)
        this.chartOptions.series = categoryCount.map(item=>item.count)

        // this.chartOptions.colors = categoryCount.map((_, index) => {
        //   return this.colors[index % this.colors.length]; // تكرار الألوان إذا كانت أكثر من الألوان المتاحة
        // });

        if(this.chart){
          this.chart.updateOptions(this.chartOptions)
}

console.log("categories",categories);
console.log('listings',listings);
console.log('lab',this.chartOptions.labels);
console.log('lab',this.chartOptions.series);

      })
    })
  }
}

