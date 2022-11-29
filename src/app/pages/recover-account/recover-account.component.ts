import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  recoverId: string = ''
  constructor(private route: ActivatedRoute, private profileService: ProfileService) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.recoverId = param['recoveryId']
    })
  }
  newPassword(password: string) {
    this.profileService.recoverAccount(this.recoverId, password).subscribe(res => {
      console.log(res)
    })
  }
}
