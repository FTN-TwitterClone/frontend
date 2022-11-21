import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  @Input() followers: User[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
