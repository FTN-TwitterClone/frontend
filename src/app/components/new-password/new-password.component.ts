import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  changePasswordForm = this.fb.group({
    'newPassword': ['', Validators.required],
    'repeatPassword': ['', Validators.required]
  })
  @Output() newPasswordEventEmitter: EventEmitter<string> = new EventEmitter<string>()
  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
  }
  onChangePassword() {
    if (this.newPassword === this.repeatPassword && this.newPassword != null) {
      this.newPasswordEventEmitter.emit(this.newPassword)
    } else {
      alert('Passwords dont match')
    }
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword')?.value
  }
  get repeatPassword() {
    return this.changePasswordForm.get('repeatPassword')?.value
  }
}
