import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, last, Observable, tap } from 'rxjs';
import { ERole } from 'src/app/model/ERole.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { ProfileService } from 'src/app/services/profile.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('', '', '', ERole.REGULAR_USER, true);
  followers: User[] = [];
  following: User[] = [];
  followersCount: number = 0;
  followingCount: number = 0;
  tweets: Tweet[] = []
  viewProfileTweets: boolean = true;
  constructor(private profileService: ProfileService, private tweetService: TweetService, private route: ActivatedRoute, private jwtUtilsService: JwtUtilsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.profileService.getUser(param['username']).subscribe(res => {
        this.user = res as User;
        this.loadProfile()
      })
    })
  }
  addTweet(tweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  ownProfile() {
    const tUsername = this.jwtUtilsService.getUsername().toLowerCase()
    const pUsername = this.user.username.toLowerCase()
    return tUsername == pUsername
  }
  loadProfile() {
    this.getFollowersCount()
    this.getFollowingCount()
    this.getTweets()
  }
  getTweets(lastId?: string) {
    this.tweetService.loadProfileTweets(this.username, lastId).subscribe({
      next: (tweets) => {
        if (tweets) {
          this.tweets = [...this.tweets, ...tweets]
        }
      },
      error: (err) => {
        if(err.status == '403'){
          this.viewProfileTweets = false
        }
      }

    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId != null) { this.getTweets(lastId) }
  }
  get username() {
    return this.user.username
  }
  getFollowers() {
    this.profileService.getFollowers(this.username).subscribe(res => {
      this.followers = res as User[]
    })
  }
  getFollowing() {
    this.profileService.getFollowing(this.username).subscribe(res => {
      this.following = res as User[]
    })
  }
  getFollowersCount() {
    this.profileService.getFollowersCount(this.username).subscribe(res => {
      this.followersCount = res as number;
    })
  }
  getFollowingCount() {
    this.profileService.getFollowingCount(this.username).subscribe(res => {
      this.followingCount = res as number;
    })
  }
  doFollow() {
    this.profileService.doFollow(this.username).subscribe(res => {
      alert('Followed')
    })
  }
  doUnfollow() {
    this.profileService.doUnfollow(this.username).subscribe(res => {
      alert('Unfollowed')
    })
  }
}
