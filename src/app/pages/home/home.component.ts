import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/model/Tweet.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = []
  constructor(
    private tweetService: TweetService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getTweets()
  }
  addTweet(tweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  getTweets() {
    this.tweetService.getAllFeedTweets().subscribe({
      next: tweets => this.tweets = tweets,
      error: err => this.errorHandlerService.alert(err)
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId) {
      this.tweetService.getFeedTweetsFromLastId(lastId).subscribe({
        next: (tweets) => {
          if (tweets) this.tweets = [...this.tweets, ...tweets]
        },
        error: (err) => {
          this.errorHandlerService.alert(err)
        }
      }
      )
    }
  }
}
