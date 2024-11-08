import { Component, ViewChild ,OnInit} from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexFill,
} from 'ng-apexcharts';
import { ReservationService} from 'src/app/services/reservation.service'
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [TranslateModule,MaterialModule, NgApexchartsModule],
  templateUrl: './total-income.component.html',
})
export class AppTotalIncomeComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public totalincomeChart:  any;
  public totalincome:number=0;

  constructor(private ReservationService:ReservationService) {
    this.totalincomeChart = {
      series: [
        {
          name: 'Income',
          color: 'rgba(255, 102, 146, 1)',
          data: [],
        },
      ],

      chart: {
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: true,
          position: 'right',
        },
        x: {
          show: false,
        },
      },
    };
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.ReservationService.getMonthlyBookingsAndRevenue(currentYear).subscribe((data) => {
      const monthlyData = this.processReservationsData(data);

      const revenue = monthlyData.map(item => item.revenue);
      console.log(`revenue: ${revenue}`);

      this.totalincome = revenue.reduce((acc,val)=>acc+val,0)

      this.getChartOptions(revenue)

    });
  }


  processReservationsData(reservations: any[]): { revenue: number }[] {
    const monthlyStats = Array.from({ length: 12 }, () => ({ revenue: 0 }));

    reservations.forEach(reservation => {
      const startDate = new Date(reservation.startDate);
      const month = startDate.getMonth();
      monthlyStats[month].revenue += reservation.totalPrice;
    });

    return monthlyStats;
  }

  getChartOptions( revenueData: number[]) {
    this.totalincomeChart.series[0].data = revenueData;

    if(this.chart){
      this.chart.updateOptions({
        series:this.totalincomeChart.series
      })
    }
  }
}
