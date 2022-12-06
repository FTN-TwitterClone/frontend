import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tweet } from 'src/app/model/Tweet.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {
  @Output() createTweetEvent: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  constructor(private fb: FormBuilder, private tweetService: TweetService, private errorHandlerService: ErrorHandlerService) { }

  createTweetForm = this.fb.group({
    text: ['']
  })

  ngOnInit(): void {
  }
  onSubmit() {
    let tweet: Tweet = this.text as Tweet
    this.tweetService.createTweet(tweet).subscribe({
      next: tweet => {
        tweet.likesCount = 0
        this.createTweetEvent.emit(tweet as Tweet); this.createTweetForm.reset()
      },
      error: err => this.errorHandlerService.alert(err)
    })
  }
  get text() { return this.createTweetForm.value }
}
