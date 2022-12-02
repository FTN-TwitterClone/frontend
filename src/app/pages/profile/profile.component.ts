import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  user!: User
  followers: User[] = [];
  following: User[] = [];
  followersCount: number = 0;
  followingCount: number = 0;
  tweets: Tweet[] = []
  viewProfileTweets: boolean = true;
  ownProfile: boolean = false
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
      next: (tweets) => {
        if (tweets) {
          this.tweets = [...this.tweets, ...tweets]
        }
      },
      error: (err) => {
        if (err.status == '403') {
          this.viewProfileTweets = false
        }
      }
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId) {
      this.tweetService.getProfileTweetsFromLastId(this.username, lastId).subscribe({
        next: (tweets) => {
          if (tweets) this.tweets = [...this.tweets, ...tweets]
        },
        error: (err) => {
          alert(`Error: ${err.message}`)
        }
      })
    }
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
