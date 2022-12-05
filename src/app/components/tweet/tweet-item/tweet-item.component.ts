import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss']
})
export class TweetItemComponent implements OnInit {
  @Output() retweetEventEmitter: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Input() tweet!: Tweet
  constructor() { }

  ngOnInit(): void {
  }

  onRetweet(retweet: Tweet) {
    this.retweetEventEmitter.emit(retweet)
  }
}
