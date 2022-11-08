import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validators } from 'src/app/components/validators/validator-variables';

@Component({
  selector: 'app-username-validator',
  templateUrl: './username-validator.component.html',
  styleUrls: ['./username-validator.component.scss']
})
export class UsernameValidatorComponent implements OnInit {
  usernameMinLength: number = validators.username.minLength
  @Input() username: AbstractControl<string | null, string | null> | null = null
  constructor() { }

  ngOnInit(): void {
  }

}
