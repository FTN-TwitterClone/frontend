import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.scss']
})
export class FollowRecommendationsComponent implements OnInit {
  recommendations!: User[]
  constructor(
    private profileService: ProfileService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getRecommendations()
  }
  getRecommendations() {
    this.profileService.getRecomendations().subscribe({
      next: response => this.recommendations = response,
      error: err => this.errorHandlerService.alert(err)
    })
  }
  onFollow(user: User) {
    this.profileService.doFollow(user.username).subscribe({
      next: () => {
        this.recommendations.splice(this.recommendations.indexOf(user), 1)
        alert('Follow request has been sent')
      },
      error: err => this.errorHandlerService.alert(err)
    })
  }
}
