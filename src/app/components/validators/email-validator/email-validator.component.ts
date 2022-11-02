import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-email-validator',
  templateUrl: './email-validator.component.html',
  styleUrls: ['./email-validator.component.scss']
})
export class EmailValidatorComponent implements OnInit {
  @Input() email: AbstractControl<string | null, string | null> | null = null
  constructor() { }

  ngOnInit(): void {
  }

}
