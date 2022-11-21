import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  @Input() following: User[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
