import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  @Output() retweetEventEmitter: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Input() tweets!: Tweet[] | null
  constructor() { }

  ngOnInit(): void {
  }
  onRetweet(retweet: Tweet) {
    this.retweetEventEmitter.emit(retweet)
  }
}
