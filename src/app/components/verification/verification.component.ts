import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.verify()
  }
  verify() {
    this.activatedRoute.params.subscribe({
      next: params => this.authService.verify(params['verificationId']).subscribe({
        next: () => {
          alert('Verification successfull')
          this.router.navigateByUrl('/login')
        }
      })
    })
  }
}
