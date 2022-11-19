import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tweets!:Tweet[]
  constructor(private tweetService:TweetService) { }

  ngOnInit(): void {
    this.getTweets()
  }
  addTweet(tweet:Tweet){
    this.tweetService.addTweetToTweets(this.tweets,tweet)
  }
  getTweets(lastId?:string):Tweet [] {
    this.tweetService.getAll(lastId).subscribe(res => {
      this.tweets = res as Tweet[]
    })
    return []
  }
  onScroll() {
    const lastId: string | null = this.tweetService.getLastId(this.tweets)
    if (lastId != null) {
      this.getTweets(lastId)
    }
  }
}
