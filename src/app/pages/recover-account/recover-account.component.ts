import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  recoverId: string = ''
  constructor(private route: ActivatedRoute, private profileService: ProfileService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: param => this.recoverId = param['recoveryId']
    })
  }
  newPassword(password: string) {
    this.profileService.recoverAccount(this.recoverId, password).subscribe({
      next: () => this.toastrService.success('Password has been updated.', 'Success'),
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
}
