import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = []
  tweets$: Observable<Tweet[]> = new Observable<Tweet[]>()
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.getTweets()
  }
  addTweet(tweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  getTweets() {
    this.tweetService.getAllFeedTweets().subscribe(tweets => {
      this.tweets = tweets
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
          alert(`Error: ${err.message}`)
        }
      }
      )
    }
  }
}
