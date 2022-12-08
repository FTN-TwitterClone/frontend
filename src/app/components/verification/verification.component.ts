import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verified: boolean = false
  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.verify()
  }
  verify() {
    this.activatedRoute.params.subscribe({
      next: params => this.authService.verify(params['verificationId']).subscribe({
        next: () => {
          this.verified = true
          this.toastrService.success('Verification successfull.', 'Success')
          this.router.navigateByUrl('/login')
        },
        error: err => this.toastrService.error(err.error, 'Error')
      }),
      error: err => this.toastrService.error(err.error, 'Error')
    })
  }
}
