import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validators } from 'src/app/components/validators/validator-variables';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.scss']
})
export class PasswordValidatorComponent implements OnInit {
  passwordMinLength: number = validators.password.minLength
  @Input() password: AbstractControl<string | null, string | null> | null = null
  constructor() { }

  ngOnInit(): void {
  }
}
