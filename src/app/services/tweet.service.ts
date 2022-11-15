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
}