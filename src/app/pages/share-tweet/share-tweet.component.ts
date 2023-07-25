import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedditCommunity } from 'src/app/model/RedditCommunity.model';
import { ShareTweet } from 'src/app/model/ShareTweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-share-tweet',
  templateUrl: './share-tweet.component.html',
  styleUrls: ['./share-tweet.component.scss']
})
export class ShareTweetComponent implements OnInit {
  
  communities: RedditCommunity[] = [];
  
  communityId = 0;
  text: string = "";

  constructor(
    private tweetService: TweetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.text = localStorage.getItem(params['state'])!!;

      let code = {
        code: params['code']
      };

      this.tweetService.postRedditCode(code);
    });

    this.tweetService.getRedditCommunities().subscribe(c =>  {
      this.communities = c;
      this.communityId = this.communities[0].id;
    });
  }
  
  onShare() {
    console.log('sja')

    let shareTweet: ShareTweet = {
      text: this.text,
      communityId: this.communityId
    };

    this.tweetService.shareTweetReddit(shareTweet).subscribe(r => {});
  }

  onSetCommunity(e: Event) {
    this.communityId = Number((e.target as HTMLInputElement).value);
  }
}
