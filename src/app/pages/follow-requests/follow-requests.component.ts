import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FollowRequestResponse } from 'src/app/model/FollowRequestResponse.model';
import { User } from 'src/app/model/User.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-follow-requests',
  templateUrl: './follow-requests.component.html',
  styleUrls: ['./follow-requests.component.scss']
})
export class FollowRequestsComponent implements OnInit {
  requests!: User[]
  constructor(private profileService: ProfileService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getRequests()
  }

  getRequests() {
    this.profileService.getFollowRequests().subscribe({
      next: users => this.requests = users as User[]
    })
  }
  onAccept(username: string) {
    const approved = new FollowRequestResponse(true)
    this.profileService.acceptRejectRequest(username, approved).subscribe({
      next: () => alert('Follow request has been accepted successfully.'),
      error: err => this.errorHandlerService.alert(err),
      complete: () => this.requests = this.requests.filter(req => req.username != username)
    })
  }
  onRemove(username: string) {
    const rejected = new FollowRequestResponse(false)
    this.profileService.acceptRejectRequest(username, rejected).subscribe({
      next: response => console.log(response),
      error: err => alert('Error: ' + err.status + '\n' + err.message),
      complete: () => this.requests = this.requests.filter(req => req.username != username)
    })
  }
}
