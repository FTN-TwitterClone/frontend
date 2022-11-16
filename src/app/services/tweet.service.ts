import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Tweet } from '../model/Tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  createTweet(tweet: Tweet) {
    return this.http.post(`${environment.api}/tweet/tweets/`, tweet)
  }

  getTweets(username: string) {
    return this.http.get(`${environment.api}/tweet/tweets/profile/${username}`)
  }
  getAll(){
    // waiting for backend to implement get all tweets
    return this.getTweets('RegularUser')
  }
  addTweetToTweets(tweets:Tweet[],tweet:Tweet){
    tweets.splice(0,0,tweet)
  }
  likeTweet(tweetId:string){
    return this.http.post(`${environment.api}/tweet/${tweetId}/like`,{})
  }
  unlikeTweet(tweetId:string){
    return this.http.post(`${environment.api}/tweet/${tweetId}/unlike`,{})
  }
}