import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.scss']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweet!: Tweet
  @Output() retweetEventEmitter: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  whoLiked: User[] = []
  constructor(
    private tweetService: TweetService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getWhoLiked()
  }
  onLikeTweet() {
    this.tweetService.likeTweet(this.tweet.id).subscribe(res => {
      this.tweet.likedByMe = true
      this.tweet.likesCount += 1
    })
  }
  onDislikeTweet() {
    this.tweetService.unlikeTweet(this.tweet.id).subscribe({
      next: (res) => {
        console.log(res)
        this.tweet.likedByMe = false
        this.tweet.likesCount -= 1
      }
    })
  }
  getWhoLiked() {
    this.tweetService.getWhoLiked(this.tweet.id).subscribe({
      next: users => users != null ? this.whoLiked = users as User[] : this.whoLiked = [],
      error: err => this.errorHandlerService.alert(err)
    })
    this.whoLiked = []
  }
  onRetweet(id: string) {
    this.tweetService.retweet(id).subscribe({
      next: tweet => this.retweetEventEmitter.emit(tweet as Tweet),
      error: err => this.errorHandlerService.alert(err)
    })
  }
}