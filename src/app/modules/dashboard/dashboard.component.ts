import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  ngOnInit(): void {}

  pieChart = new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },

    credits: {
      enabled: false,
    },

    title: {
      text: 'Messages Sent',
    },

    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },

    series: [
      {
        type: 'pie',
        data: [
          { name: 'Airtel', y: 60, color: 'red' },
          { name: 'MTN', y: 30, color: 'yellow' },
          { name: 'ZAMTEL', y: 10, color: 'green' },
        ],
      },
    ],
  });

  lineChart = new Chart({
    chart: {
      type: 'spline',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    //   yAxis: {
    //     categories: ['10', '20', '30', '30', '50', '60', '70', '80', 'Sep', 'Oct', 'Nov', 'Dec']
    // },
    title: {
      text: 'Messages Sent',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Airtel',
        data: [10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16, 6],
        color: 'red',
      } as any,
      {
        name: 'MTN',
        data: [1, 2, 3, 16, 9, 17, 7, 10, 9, 2, 12, 4],
        color: 'yellow',
      } as any,
      {
        name: 'Zamtel',
        data: [7, 12, 3, 8, 3, 1, 15, 11, 6, 4, 18, 16],
        color: 'green',
      } as any,
    ],
  });
}
