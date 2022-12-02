import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.scss']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweet!: Tweet
  whoLiked: String[] | null = []
  constructor(
    private tweetService: TweetService,
    private jwtUtilsService: JwtUtilsService
  ) { }

  ngOnInit(): void {
  }
  onLikeTweet() {
    this.tweetService.likeTweet(this.tweet.id).subscribe(res => {
      this.tweet.likedByMe = true
      this.tweet.likesCount += 1
    })
  }
  onDislikeTweet() {
    this.tweetService.unlikeTweet(this.tweet.id).subscribe(res => {
      this.tweet.likedByMe = false
      this.tweet.likesCount -= 1
    })
  }
  getWhoLiked() {
    this.tweetService.getWhoLiked(this.tweet.id).subscribe(res => {
      const users: User[] = res as User[]
      if (users != null) {
        this.whoLiked = users.map(x => x.username)
      }
    })
    this.whoLiked = null
  }
  onRetweet(id: string) {
    this.tweetService.retweet(id).subscribe(res => {
      console.log(res)
    })
  }
  ownTweet(): boolean {
    const username: string | null = this.jwtUtilsService.getUsername()
    if (username && username.toLowerCase() == this.tweet.postedBy.toLowerCase()) {
      return true
    }
    return false
  }
}