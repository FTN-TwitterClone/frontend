import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.scss']
})
export class TweetItemComponent implements OnInit {

  @Input() tweet!: Tweet
  constructor() { }

  ngOnInit(): void {
    console.log(this.tweet)
  }

  onLikeTweet(liked: boolean) {

  }

}
