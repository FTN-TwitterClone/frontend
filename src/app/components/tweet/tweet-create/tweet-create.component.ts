import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {

  constructor(private fb: FormBuilder, private tweetService: TweetService) { }

  createTweetForm = this.fb.group({
    text: ['']
  })

  ngOnInit(): void {
  }
  onSubmit() {
    let tweet: Tweet = this.createTweetForm.value as Tweet
      this.tweetService.createTweet(tweet).subscribe(res => {
        console.log(res as Tweet)
      })
  }

  get text() { return this.createTweetForm.get('text') }
}
