import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
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
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.verify()
  }
  verify() {
    this.activatedRoute.params.subscribe({
      next: params => this.authService.verify(params['verificationId']).subscribe({
        next: () => {
          this.verified = true
          alert('Verification successfull')
          this.router.navigateByUrl('/login')
        },
        error: err => this.errorHandlerService.alert(err)
      }),
      error: err => this.errorHandlerService.alert(err)
    })
  }
}
