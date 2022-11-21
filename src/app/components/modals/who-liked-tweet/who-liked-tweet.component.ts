import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-who-liked-tweet',
  templateUrl: './who-liked-tweet.component.html',
  styleUrls: ['./who-liked-tweet.component.scss']
})
export class WhoLikedTweetComponent implements OnInit {
  @Input() usernames:String[] = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.usernames)
  }

}
