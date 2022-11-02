import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-age-validator',
  templateUrl: './age-validator.component.html',
  styleUrls: ['./age-validator.component.scss']
})
export class AgeValidatorComponent implements OnInit {
  @Input() age: AbstractControl<number | null, number | null> | null = null
  ageMin: number = environment.validators.age.min
  constructor() { }

  ngOnInit(): void {
  }

}
