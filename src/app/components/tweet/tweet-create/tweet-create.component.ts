import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet, UploadTweet } from 'src/app/model/Tweet.model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {
  @Output() createTweetEvent: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  selectedImage!: File | null
  saveInProgress: boolean = false
  constructor(private fb: FormBuilder, private tweetService: TweetService, private toastrService: ToastrService) { }

  createTweetForm = this.fb.group({
    text: [''],
    image: ['']
  })

  ngOnInit(): void {
  }
  onSubmit() {
    this.saveInProgress = true
    let tweet: UploadTweet = new UploadTweet('', this.text as string)
    if (this.selectedImage) {
      this.tweetService.uploadImage(this.selectedImage).subscribe({
        next: imageId => {
          tweet.imageId = imageId
          this.saveTweet(tweet)
        },
        error: err => this.toastrService.error(err.error, 'Error'),
        complete: () => this.saveInProgress = false
      })
    } else {
      this.saveTweet(tweet)
    }

  }
  saveTweet(tweet: UploadTweet) {
    this.tweetService.createTweet(tweet).subscribe({
      next: tweet => {
        tweet.likesCount = 0
        this.createTweetEvent.emit(tweet as Tweet); this.createTweetForm.reset()
      },
      error: err => this.toastrService.error(err.error, 'Error'),
      complete: () => {
        this.saveInProgress = false
        this.selectedImage = null
        this.createTweetForm.reset()
        this.toastrService.success('Tweet posted successfully.', 'Success')
      }
    })
  }
  selectImage(event: Event) {
    //@ts-ignore
    this.selectedImage = (event.target as HTMLInputElement).files[0];
  }
  get text() { return this.createTweetForm.value?.text }
  get image() { return this.createTweetForm.value?.image }
}
