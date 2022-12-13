import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, retry, Subscription, timer } from 'rxjs';
import { AdInfo, Report, TweetViewTime } from 'src/app/model/Ad.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { AdService } from 'src/app/services/ad.service';

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
  timerSub!: Subscription;
  secondsViewingTime: number = 0
  constructor(
    private adService: AdService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    if (this.tweet.ad) {
      let el: Element | null = document.querySelector('#ad-' + this.tweet.id)
      this.observer = this.createIntersectionObserver()
      if (el) this.observer.observe(el)
    }
  }
  ngOnDestroy() {
  }

  createIntersectionObserver(): IntersectionObserver {
    return new IntersectionObserver(entries => {
      entries.forEach(element => {
        let timerObs: Observable<number> = timer(0, 1000);
        if (element.isIntersecting) {
          this.timerSub = timerObs.subscribe(t => {
            this.secondsViewingTime = t
          })
        } else {
          this.timerSub?.unsubscribe()
          this.adService.adViewed(this.tweet.id, new TweetViewTime(this.secondsViewingTime)).subscribe({
            error: err => this.toastrService.error(err.error, 'Error')
          })
          this.secondsViewingTime = 0
        }
      }, {
        threshold: 1
      });
    })
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
