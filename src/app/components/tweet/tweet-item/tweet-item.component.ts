import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdInfo, Report, TweetViewTime } from 'src/app/model/Ad.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { AdService } from 'src/app/services/ad.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss']
})
export class TweetItemComponent implements OnInit {
  @Output() retweetEventEmitter: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Input() tweet!: Tweet
  private observer!: IntersectionObserver
  @Input() adInfo!: AdInfo
  originalPostedBy: boolean = false
  report!: Report
  constructor(
    private adService: AdService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void { }
  ngAfterViewInit() {
    if (this.tweet.ad) {
      let intersectingTime: number = 0
      let interval
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === true) {
          interval = setInterval(() => {
            intersectingTime++
          }, 100)
        } else {
          this.adService.adViewed(this.tweet.id, new TweetViewTime(intersectingTime))
          intersectingTime = 0
        }
      }, {
        threshold: 0.75
      });
      const el = document.querySelector('#ad')
      el ? this.observer.observe(el) : ''
    }
  }

  ngOnDestroy() {
    this.tweet.ad ? this.observer.disconnect() : ''
  }
  onRetweet(retweet: Tweet) {
    this.retweetEventEmitter.emit(retweet)
  }
  onGetAdInfo() {
    this.adService.getInfo(this.tweet.id).subscribe({
      next: adInfo => {
        this.adInfo = adInfo as AdInfo
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
}
