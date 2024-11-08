import { Component, ViewChild ,OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {  ChartComponent, NgApexchartsModule} from 'ng-apexcharts';
import { ReservationService} from 'src/app/services/reservation.service'
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-revenue-forecast',
  standalone: true,
  imports: [TranslateModule,MaterialModule, TablerIconsModule, NgApexchartsModule],
  templateUrl: './revenue-forecast.component.html',
})
export class AppRevenueForecastComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart:  any;


  constructor( private ReservationService:ReservationService) {
    this.revenueForecastChart ={
      series: [],
      chart: {
        type: 'area',
        fontFamily:'inherit',
        foreColor: '#adb0bb',
        height: 330,
        stacked: true,
        toolbar: { show: false },
      },
      colors: ['rgba(99, 91, 255, 1)', 'rgba(255, 102, 146,1)'],
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Des'],
        labels: { style: { fontSize: '13px', colors: '#adb0bb' } },
      },
      grid: {
            show: true,
            borderColor: 'rgba(0,0,0,0.05)',
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },},
      tooltip: { theme: 'light' },
    }
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.ReservationService.getMonthlyBookingsAndRevenue(currentYear).subscribe((data) => {
      const monthlyData = this.processReservationsData(data);
      const bookings = monthlyData.map(item => item.bookings);
      console.log(`bookings: ${bookings}`);

      const revenue = monthlyData.map(item => item.revenue);
      console.log(`revenue: ${revenue}`);

      this.revenueForecastChart = this.getChartOptions(bookings, revenue);
      if (this.chart) {
        this.chart.updateOptions(this.revenueForecastChart);
      }

    });
  }


  processReservationsData(reservations: any[]): { bookings: number, revenue: number }[] {
    const monthlyStats = Array.from({ length: 12 }, () => ({ bookings: 0, revenue: 0 }));

    reservations.forEach(reservation => {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);
      const month = startDate.getMonth(); // الحصول على الشهر

      monthlyStats[month].bookings += 1;
      monthlyStats[month].revenue += reservation.totalPrice;
    });

    return monthlyStats;
  }

  getChartOptions(bookingsData: number[], revenueData: number[]) {
    return {
      series: [
        { name: 'Count Resservations', data: bookingsData },
        { name: 'Revenue Resservations', data: revenueData },
      ],
      chart: {
        type: 'area',
        fontFamily:'inherit',
        foreColor: '#adb0bb',
        height: 330,
        stacked: true,
        toolbar: { show: false },
      },
      colors: ['rgba(99, 91, 255, 1)', 'rgba(255, 102, 146,1)'],
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Des'],
        labels: { style: { fontSize: '13px', colors: '#adb0bb' } },
      },
      grid: {
            show: true,
            borderColor: 'rgba(0,0,0,0.05)',
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },},
      tooltip: { theme: 'light' },
    };
  }
}
