import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  getTweetsByUsername(username: string) {
    return this.http.get<Tweet[]>(`${environment.api}/tweet/tweets/profile/${username}`)
  }
  getProfileTweetsFromLastId(username: string, lastTweetId: string) {
    const params = new HttpParams().append('beforeId', lastTweetId)
    return this.http.get<Tweet[]>(`${environment.api}/tweet/tweets/profile/${username}`, { params: params })
  }
  getFeedTweetsFromLastId(lastTweetId: string): Observable<Tweet[]> {
    const params = new HttpParams().append('beforeId', lastTweetId)
    return this.http.get<Tweet[]>(`${environment.api}/tweet/tweets/feed`, { params: params })
  }
  getAllFeedTweets() {
    return this.http.get<Tweet[]>(`${environment.api}/tweet/tweets/feed`)
  }
  retweet(id: string) {
    return this.http.post(`${environment.api}/tweet/tweets/${id}/retweet`, {})
  }
  addTweetToTweets(tweets: Tweet[] | null, tweet: Tweet) {
    if (tweets == null) {
      tweets = []
      tweets.push(tweet)
      return
    }
    tweets.splice(0, 0, tweet)
  }
  likeTweet(tweetId: string) {
    return this.http.put(`${environment.api}/tweet/tweets/${tweetId}/like`, {})
  }
  unlikeTweet(tweetId: string) {
    return this.http.put(`${environment.api}/tweet/tweets/${tweetId}/unlike`, {})
  }
  getWhoLiked(tweetId: string) {
    return this.http.get(`${environment.api}/tweet/tweets/${tweetId}/likes`)
  }
  getLastId(tweets: Tweet[]): string | null {
    if (tweets) {
      const lastTweet: Tweet | undefined = tweets.at(tweets.length - 1)
      if (lastTweet) {
        return lastTweet.id.toString()
      }
    }
    return null
  }
}