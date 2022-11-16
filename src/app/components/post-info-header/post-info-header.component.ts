import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/model/Tweet.model';

@Component({
  selector: 'app-post-info-header',
  templateUrl: './post-info-header.component.html',
  styleUrls: ['./post-info-header.component.scss']
})
export class PostInfoHeaderComponent implements OnInit {
  @Input() tweet!:Tweet
  constructor() { }

  ngOnInit(): void {
  }

}
