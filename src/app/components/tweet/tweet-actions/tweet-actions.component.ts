import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
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
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getWhoLiked()
  }
  onLikeTweet() {
    this.tweetService.likeTweet(this.tweet.id).subscribe({
      next: () => {
        this.tweet.likedByMe = true
        this.tweet.likesCount += 1
        this.toastrService.success('Tweet liked.', 'Success')
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onDislikeTweet() {
    this.tweetService.unlikeTweet(this.tweet.id).subscribe({
      next: () => {
        this.tweet.likedByMe = false
        this.tweet.likesCount -= 1
        this.toastrService.success('Tweet disliked.', 'Success')
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  getWhoLiked() {
    this.tweetService.getWhoLiked(this.tweet.id).subscribe({
      next: users => users != null ? this.whoLiked = users as User[] : this.whoLiked = [],
      error: err => this.toastrService.error(err.error, 'Error')
    })
    this.whoLiked = []
  }
  onRetweet(id: string) {
    this.tweetService.retweet(id).subscribe({
      next: tweet => {
        tweet.likesCount = 0
        this.retweetEventEmitter.emit(tweet as Tweet);
        this.toastrService.success('Retweeted successfully.', 'Success')
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onShareReddit(id: string) {
    let state = Math.random().toString(36).slice(2, 15);

    localStorage.setItem(state, this.tweet.text);

    window.location.href='http://localhost:9090/authorize?redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fshare_reddit_redirect&response_type=code&client_id=81935b0a-f4ad-466b-802a-9abde6a02fb5&scope=create_post&state=' + state
  }
}