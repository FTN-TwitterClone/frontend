import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets!: Tweet[]
  loading: boolean = true
  constructor(
    private tweetService: TweetService,
    private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getTweets()
  }
  addTweet(tweet: Tweet) {
    this.tweets = this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  getTweets() {
    this.tweetService.getAllFeedTweets().subscribe({
      next: tweets => {
        this.loading = true
        this.tweets = tweets
        const ad = new Tweet('1', 'Ad user', '', false, true, 'Ad', '9/12/2022', '', false, 0)
        this.tweets.push(ad)
      },
      error: err => this.toastrService.error(err.error, 'Error'),
      complete: () => this.loading = false
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    if (lastId) {
      this.tweetService.getFeedTweetsFromLastId(lastId).subscribe({
        next: (tweets) => {
          if (tweets) {
            this.loading = true
            this.tweets = [...this.tweets, ...tweets]
          }
        },
        error: (err) => {
          this.toastrService.error(err.error, 'Error')
        },
        complete: () => this.loading = false
      }
      )
    }
  }
}
