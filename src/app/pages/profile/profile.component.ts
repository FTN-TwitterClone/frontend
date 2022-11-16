import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/model/ERole.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('username', '', 'email@example.com', ERole.REGULAR_USER, false);
  tweets!: Tweet[] | null
  constructor(private jwtUtilsService: JwtUtilsService, private tweetService: TweetService) { }

  ngOnInit(): void {
    this.user.username = this.jwtUtilsService.getUsername()
    this.tweetService.getTweets(this.user.username).subscribe(res => {
      this.tweets = res as Tweet[]
    })
  }
  addTweet(tweet: Tweet) {
    this.tweets?.push(tweet)
  }
}
