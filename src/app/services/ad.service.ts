import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TargetGroup } from '../model/TargetGroup.model';
import { Tweet, UploadTweet } from '../model/Tweet.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(
    private http: HttpClient
  ) { }

  createAd(tweet: UploadTweet, targetGroup: TargetGroup) {
    return this.http.post<Tweet>(`${environment.api}/tweet/tweets/ads`, { 'tweet': tweet, 'targetGroup': targetGroup })
  }
}
