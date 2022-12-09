import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss']
})
export class TweetItemComponent implements OnInit {
  @Output() retweetEventEmitter: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Input() tweet!: Tweet
  private observer!: IntersectionObserver;
  time: number = 0

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if (this.tweet.ad) {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === true) {
          console.log('Ad id:' + this.tweet.id)
        } else {
          console.log('not in vp')
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
}
