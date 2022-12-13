import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/model/Ad.model';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-report',
  templateUrl: './ad-report.component.html',
  styleUrls: ['./ad-report.component.scss']
})
export class AdReportComponent implements OnInit {
  @Input() uniqueId: string = ''
  @Input() tweetId: string = ''
  reportForm = new FormBuilder().group({
    year: [0],
    month: [0],
    day: [0]
  })
  report!: Report
  constructor(
    private adService: AdService,
    private toastrService: ToastrService
  ) { }
  ngOnInit() { }

  onGetDailyReport() {
    this.adService.getDailyReport(this.tweetId, this.year, this.month, this.day).subscribe({
      next: report => {
        this.report = report as Report
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onGetMonthlyReport() {
    this.adService.getMonthlyReport(this.tweetId, this.year, this.month).subscribe({
      next: report => {
        this.report = report as Report
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }

  get year(): number {
    const year: number | null = this.reportForm?.get('year')?.value as number | null
    return year ? year : 0
  }
  get month(): number {
    const month: number | null = this.reportForm?.get('month')?.value as number | null
    return month ? month : 0
  }
  get day(): number {
    const day: number | null = this.reportForm?.get('day')?.value as number | null
    return day ? day : 0
  }
}
