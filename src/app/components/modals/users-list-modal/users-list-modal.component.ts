import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-users-list-modal',
  templateUrl: './users-list-modal.component.html',
  styleUrls: ['./users-list-modal.component.scss']
})
export class UsersListModalComponent implements OnInit {
  @Input() users: User[] = []
  @Input() title: string = 'Modal'
  @Input() noUsersMessage: string = 'No users'
  @Input() uniqueId: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
