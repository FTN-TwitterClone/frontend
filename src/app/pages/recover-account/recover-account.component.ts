import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  recoverId: string = ''
  constructor(private route: ActivatedRoute, private profileService: ProfileService, private errorHandlerService: ErrorHandlerService) { }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => this.recoverId = param['recoveryId']
    })
  }
  newPassword(password: string) {
    this.profileService.recoverAccount(this.recoverId, password).subscribe({
      next: () => alert('Password has been updated.'),
      error: err => this.errorHandlerService.alert(err)
    })
  }
}
