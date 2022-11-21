import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tweet } from 'src/app/model/Tweet.model';
import { JwtUtilsService } from 'src/app/services/security/jwt-utils.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {
  @Output() createTweetEvent: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  constructor(private fb: FormBuilder, private tweetService: TweetService, private jwtUtilsService: JwtUtilsService) { }

  createTweetForm = this.fb.group({
    text: ['']
  })

  ngOnInit(): void {
  }
  onSubmit() {
    let tweet: Tweet = this.text as Tweet
    if (tweet.text == '') {
      alert('Tweet can\'t be empty!')
      return
    }
    this.tweetService.createTweet(tweet).subscribe(res => {
      this.addNewItem(res as Tweet)
      this.createTweetForm.reset()
    })
  }
  addNewItem(tweet: Tweet) {
    this.createTweetEvent.emit(tweet)
  }
  get text() { return this.createTweetForm.value }
}
