import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User
  followers: User[] = [];
  following: User[] = [];
  followersCount: number = 0;
  followingCount: number = 0;
  tweets: Tweet[] = []
  viewProfileTweets: boolean = true;
  ownProfile: boolean = false
  constructor(
    private profileService: ProfileService,
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private jwtUtilsService: JwtUtilsService,
    private errorHandlerService: ErrorHandlerService) { }


  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        this.profileService.getUser(param['username']).subscribe({
          next: user => {
            this.user = user as User
            this.loadProfile()
          }
        })
      }
    })
  }
  addTweet(tweet: Tweet) {
    this.tweets = this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  checkIfOwnProfile() {
    const tUsername: string | null = this.jwtUtilsService.getUsername()
    const pUsername: string = this.user.username
    if (tUsername) {
      this.ownProfile = tUsername.toLowerCase() === pUsername.toLowerCase()
    }
  }
  loadProfile() {
    this.getFollowersCount()
    this.getFollowingCount()
    this.getTweets()
    this.checkIfOwnProfile()
  }
  getTweets() {
    this.tweetService.getTweetsByUsername(this.username).subscribe({
      next: tweets => this.tweets = tweets,
      error: err => {
        if (err.status == '403') {
          this.viewProfileTweets = false
        } else {
          this.errorHandlerService.alert(err)
        }
      }
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId) {
      this.tweetService.getProfileTweetsFromLastId(this.username, lastId).subscribe({
        next: tweets => tweets ? this.tweets = [...this.tweets, ...tweets] : '',
        error: err => this.errorHandlerService.alert(err)
      })
    }
  }
  get username() {
    return this.user.username
  }
  getFollowers() {
    this.profileService.getFollowers(this.username).subscribe({
      next: followers => this.followers = followers as User[],
      error: err => this.errorHandlerService.alert(err)
    })
  }
  getFollowing() {
    this.profileService.getFollowing(this.username).subscribe({
      next: following => this.following = following as User[],
      error: err => this.errorHandlerService.alert(err)
    })
  }
  getFollowersCount() {
    this.profileService.getFollowersCount(this.username).subscribe({
      next: count => this.followersCount = count as number,
      error: err => this.errorHandlerService.alert(err)
    })
  }
  getFollowingCount() {
    this.profileService.getFollowingCount(this.username).subscribe({
      next: count => this.followingCount = count as number,
      error: err => this.errorHandlerService.alert(err)
    })
  }
  doFollow() {
    this.profileService.doFollow(this.username).subscribe({
      next: () => alert('Follow sent.'),
      error: err => this.errorHandlerService.alert(err)
    })
  }
  doUnfollow() {
    this.profileService.doUnfollow(this.username).subscribe({
      next: () => alert('User has been unfollowed.'),
      error: err => this.errorHandlerService.alert(err)
    })
  }
  onRetweet(retweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, retweet)
  }
}
