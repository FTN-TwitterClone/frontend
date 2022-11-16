import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.scss']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweetId!:string
  constructor(
    private tweetService:TweetService
  ) { }

  ngOnInit(): void {
  }
  onLikeTweet(tweetId:string){

  }

}
