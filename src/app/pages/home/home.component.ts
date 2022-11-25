import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets: Tweet[] = []
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.getTweets()
  }
  addTweet(tweet: Tweet) {
    this.tweetService.addTweetToTweets(this.tweets, tweet)
  }
  getTweets(lastId?: string) {
    // this.tweetService.loadFeedTweets(lastId).subscribe(res => {
    //   this.tweets = [...this.tweets, ...res as Tweet[]]
    // })
    this.tweetService.getAll().subscribe(res => {
      this.tweets = res as Tweet[]
    })
  }
  onScroll() {
    const lastId = this.tweetService.getLastId(this.tweets)
    lastId != null ? this.getTweets(lastId) : ''
  }
}
