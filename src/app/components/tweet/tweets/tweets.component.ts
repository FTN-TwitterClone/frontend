import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  @Input() tweets!: Tweet[]
  constructor() { }

  ngOnInit(): void {
  }

}
