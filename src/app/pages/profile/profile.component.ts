import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, last, tap } from 'rxjs';
import { ERole } from 'src/app/model/ERole.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { Follow, User } from 'src/app/model/User.model';
import { ProfileService } from 'src/app/services/profile.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('username', '', 'email@example.com', ERole.REGULAR_USER, false);
  followers: User[] = [];
  following: User[] = [];
  tweets!: Tweet[]
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

  loadProfile() {
    this.getTweets(this.username)
    this.getFollowers(this.username)
    this.getFollowing(this.username)
  }
  getTweets(username: string, lastId?:string) {
    this.tweetService.getTweets(username, lastId).subscribe(res => {
      this.tweets = res as Tweet[]
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
  getFollowers(username: string) {
    this.profileService.getFollowers(username).subscribe(res => {
      this.followers = res as User[]
    })
  }
  getFollowing(username: string) {
    this.profileService.getFollowing(username).subscribe(res => {
      this.following = res as User[]
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
  ownProfile(): boolean {
    return this.jwtUtilsService.getUsername() == this.user.username
  }
}
