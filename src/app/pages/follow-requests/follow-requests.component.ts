import { Component, OnInit } from '@angular/core';
import { FollowRequestResponse } from 'src/app/model/FollowRequestResponse.model';
import { User } from 'src/app/model/User.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-follow-requests',
  templateUrl: './follow-requests.component.html',
  styleUrls: ['./follow-requests.component.scss']
})
export class FollowRequestsComponent implements OnInit {
  requests: User[] = []
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getRequests()
  }

  getRequests() {
    this.profileService.getFollowRequests().subscribe(res => {
      this.requests = res as User[]
    })
  }
  onAccept(username:string){
    const approved = new FollowRequestResponse(true)
    this.profileService.acceptRejectRequest(username,approved).subscribe(res => {
      console.log(res)
    })
  }
  onRemove(username:string){
    const rejected = new FollowRequestResponse(false)
    this.profileService.acceptRejectRequest(username,rejected).subscribe(res => {
      console.log(res)
    })
  }
}
