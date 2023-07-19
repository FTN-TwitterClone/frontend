import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EGender } from 'src/app/model/EGender.model';
import { TargetGroup } from 'src/app/model/TargetGroup.model';
import { Tweet, UploadTweet } from 'src/app/model/Tweet.model';
import { AdService } from 'src/app/services/ad.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {
  @Output() createTweetEvent: EventEmitter<Tweet> = new EventEmitter<Tweet>()
  @Input() createTweetPlaceholderMessage: string = 'What\'s happening?'
  @Input() isAd: boolean = false
  selectedImage!: File | null
  saveInProgress: boolean = false
  enumGender: typeof EGender = EGender;
  constructor(
    private tweetService: TweetService,
    private toastrService: ToastrService,
    private adService: AdService
  ) { }

  createTweetForm = new FormBuilder().group({
    text: [''],
    image: ['']
  })
  targetGroupForm = new FormBuilder().group({
    town: [''],
    gender: [''],
    minAge: [0],
    maxAge: [0]
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
          if (this.isAd) {
            this.saveAd(tweet)
          } else {
            this.saveTweet(tweet)
          }
        },
        error: err => this.toastrService.error(err.error, "Error"),
        complete: () => this.saveInProgress = false
      })
      return
    }
    if (this.isAd) {
      this.saveAd(tweet)
    } else {
      this.saveTweet(tweet)
    }
  }
  saveAd(tweet: UploadTweet) {
    let targetGroup: TargetGroup = new TargetGroup('', '', 0, 0)
    targetGroup = this.targetGroupForm.value as TargetGroup
    this.adService.createAd(tweet, targetGroup).subscribe({
      next: ad => {
        ad.likesCount = 0
        this.createTweetEvent.emit(ad as Tweet);
        this.createTweetForm.reset()
      },
      error: err => this.toastrService.error(err.error, 'Error'),
      complete: () => {
        this.saveInProgress = false
        this.toastrService.success('Ad posted successfully.', 'Success')
      }
    })
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
