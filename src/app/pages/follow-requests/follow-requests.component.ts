import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FollowRequestResponse } from 'src/app/model/FollowRequestResponse.model';
import { User } from 'src/app/model/User.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-follow-requests',
  templateUrl: './follow-requests.component.html',
  styleUrls: ['./follow-requests.component.scss']
})
export class FollowRequestsComponent implements OnInit {
  requests!: User[]
  constructor(private profileService: ProfileService, private toastrService: ToastrService) { }

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
      next: () => this.toastrService.success('Request accepted.', 'Success'),
      error: err => this.toastrService.error(err.error, 'Error'),
      complete: () => this.requests = this.requests.filter(req => req.username != username)
    })
  }
  onRemove(username: string) {
    const rejected = new FollowRequestResponse(false)
    this.profileService.acceptRejectRequest(username, rejected).subscribe({
      next: response => this.toastrService.success('Request removed.','Success'),
      error: err => this.toastrService.error(err.error,'Error'),
      complete: () => this.requests = this.requests.filter(req => req.username != username)
    })
  }
}
