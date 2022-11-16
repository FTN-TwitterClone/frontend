import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  whoLiked: String[] = []
  constructor(
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
  }
  onLikeTweet() {
    this.tweetService.likeTweet(this.tweet.id).subscribe(res => {
      this.tweet.liked_by_me = true
      this.tweet.likes_count += 1
    })
  }
  onUnlikeTweet() {
    this.tweetService.unlikeTweet(this.tweet.id).subscribe(res => {
      this.tweet.liked_by_me = false
      this.tweet.likes_count -= 1
    })
  }
  getWhoLiked() {
    this.tweetService.getWhoLiked(this.tweet.id).subscribe(res => {
      const users: User[] = res as User[]
      this.whoLiked = users.map(x => x.username)
    })
  }
}