import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-username-validator',
  templateUrl: './username-validator.component.html',
  styleUrls: ['./username-validator.component.scss']
})
export class UsernameValidatorComponent implements OnInit {
  usernameMinLength: number = environment.validators.username.minLength
  @Input() username: AbstractControl<string | null, string | null> | null = null
  constructor() { }

  ngOnInit(): void {
  }

}
