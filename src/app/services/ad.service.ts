import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Report, TweetViewTime } from '../model/Ad.model';
import { TargetGroup } from '../model/TargetGroup.model';
import { Tweet, UploadTweet } from '../model/Tweet.model';
import { AdInfo } from '../model/Ad.model';

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
  adViewed(adId: string, viewTime: TweetViewTime) {
    return this.http.post(`${environment.api}/ads/${adId}/view/`, viewTime)
  }
  getInfo(adId: string) {
    return this.http.get<AdInfo>(`${environment.api}/ads/${adId}/info/`)
  }
  adProfileVisited(adId: string) {
    return this.http.post(`${environment.api}/ads/${adId}/visit/`, {})
  }
  getDailyReport(adId: string, year: number, month: number, day: number) {
    return this.http.get<Report>(`${environment.api}/ads/${adId}/reports/${year}/${month}/${day}/`)
  }
  getMonthlyReport(adId: string, year: number, month: number) {
    return this.http.get<Report>(`${environment.api}/ads/${adId}/reports/${year}/${month}/`)
  }
}
