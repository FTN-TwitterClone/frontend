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
  getTweets(lastId?: string): Tweet[] {
    this.tweetService.getAll(lastId).subscribe(res => {
      this.tweets = res as Tweet[]
    })
    return []
  }
  onScroll() {
    const lastTweet: Tweet | undefined = this.tweets.at(this.tweets.length - 1)
    if (lastTweet != undefined && lastTweet != null) {
      const lastId: string = lastTweet.id.toString()
      this.tweetService.getAll(lastId).subscribe(res => {
        const newTweets: Tweet[] = res as Tweet[]
        if (newTweets != null) {
          this.tweets = [...this.tweets, ...newTweets]
        }
        return []
      })
    }
  }
}
