import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { Tweet } from 'src/app/model/Tweet.model';
import { User } from 'src/app/model/User.model';
import { AdService } from 'src/app/services/ad.service';
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
  followExists: boolean = false;
  followRequestExists: boolean = false;
  tweets: Tweet[] = []
  viewProfileTweets: boolean = true;
  ownProfile: boolean = false
  constructor(
    private profileService: ProfileService,
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private jwtUtilsService: JwtUtilsService,
    private toastrService: ToastrService,
    private adService: AdService) { }


  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => {
        if (param['username']) {
          this.profileService.getUser(param['username']).subscribe({
            next: user => {
              this.user = user as User
              this.loadProfile()
            }
          })
        }
      }
    })
    this.route.queryParams.subscribe({
      next: param => {
        param['fromAd'] ? this.adService.adProfileVisited(param['fromAd']).subscribe() : ''
      },
      error: err => this.toastrService.error(err.error, 'Error'),
    })
  }
  addTweet(tweet: Tweet) {
    this.tweets = this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  checkIfOwnProfile() {
    const tUsername: string = this.jwtUtilsService.getUsername() as string
    const pUsername: string = this.user.username
    this.ownProfile = tUsername.toLowerCase() === pUsername.toLowerCase()
  }
  loadProfile() {
    this.getFollowersCount()
    this.getFollowingCount()
    this.getTweets()
    this.checkIfOwnProfile()
    this.checkFollowExists()
    this.checkFollowRequestExists()
  }
  ngOnChanges(changes: SimpleChange) {
    console.log(changes)
  }
  getTweets() {
    this.tweetService.getTweetsByUsername(this.username).subscribe({
      next: tweets => this.tweets = tweets,
      error: err => {
        if (err.status == '403') {
          this.viewProfileTweets = false
        } else {
          this.toastrService.error(err.error, 'Error')
        }
      }
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId) {
      this.tweetService.getProfileTweetsFromLastId(this.username, lastId).subscribe({
        next: tweets => tweets ? this.tweets = [...this.tweets, ...tweets] : '',
        error: err => this.toastrService.error(err.error, 'Error')
      })
    }
  }
  get username() {
    return this.user.username
  }
  getFollowers() {
    this.profileService.getFollowers(this.username).subscribe({
      next: followers => this.followers = followers as User[],
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  getFollowing() {
    this.profileService.getFollowing(this.username).subscribe({
      next: following => this.following = following as User[],
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  getFollowersCount() {
    this.profileService.getFollowersCount(this.username).subscribe({
      next: count => this.followersCount = count as number,
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  getFollowingCount() {
    this.profileService.getFollowingCount(this.username).subscribe({
      next: count => this.followingCount = count as number,
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  doFollow() {
    this.profileService.doFollow(this.username).subscribe({
      next: () => {
        this.toastrService.success('Follow has been sent.', 'Success')
        if (!this.user.private) {
          this.followersCount += 1
          this.followExists = true
        } else {
          this.followRequestExists = true
        }
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  doUnfollow() {
    this.profileService.doUnfollow(this.username).subscribe({
      next: () => {
        this.toastrService.success('User has been unfollowed.', 'Success')
        if (!this.user.private) {
          this.followersCount -= 1
        }
        this.followExists = false
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onRetweet(retweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, retweet)
  }
  checkFollowRequestExists() {
    this.profileService.checkIfFollowRequestExists(this.username).subscribe({
      next: followRequest => this.followRequestExists = followRequest as boolean,
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  checkFollowExists() {
    this.profileService.checkIfFollowExists(this.username).subscribe({
      next: following => this.followExists = following as boolean,
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
}
