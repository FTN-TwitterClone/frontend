import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/User.model';
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
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRecommendations()
  }
  getRecommendations() {
    this.profileService.getRecomendations().subscribe({
      next: response => this.recommendations = response,
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
  onFollow(user: User) {
    this.profileService.doFollow(user.username).subscribe({
      next: () => {
        this.recommendations.splice(this.recommendations.indexOf(user), 1)
        this.toastrService.success('Follow request has been sent.', 'Success')
      },
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
}
