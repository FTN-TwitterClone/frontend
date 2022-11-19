import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, last, tap } from 'rxjs';
import { ERole } from 'src/app/model/ERole.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { ProfileService } from 'src/app/services/profile.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('username', '', 'email@example.com', ERole.REGULAR_USER, false);
  tweets: Tweet[] = []
  constructor(private profileService: ProfileService, private tweetService: TweetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProfile()
  }
  addTweet(tweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  loadProfile() {
    this.route.params.subscribe(param => {
      this.getTweets(param['username'], '')
      this.profileService.getUser(param['username']).subscribe(res => {
        this.user = res as User;
      }
      )
    })
  }
  getTweets(username: string, lastTweetId: string) {
    this.tweetService.getTweets(username, lastTweetId).subscribe(res => {
      if (this.tweets.length > 0) {
        const newTweets: Tweet[] = res as Tweet[]
        if (newTweets != null) { this.tweets = this.tweets.concat(newTweets) }
      } else {
        this.tweets = res as Tweet[]
      }
    })
  }
  onScroll() {
    const lastId: string | null = this.tweetService.getLastId(this.tweets)
    if (lastId != null) {
      this.getTweets(this.username, lastId)
    }
  }
  get username() {
    return this.user.username
  }
}
