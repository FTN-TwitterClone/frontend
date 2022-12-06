import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstnameValidatorComponent } from './firstname-validator.component';

describe('FirstnameValidatorComponent', () => {
  let component: FirstnameValidatorComponent;
  let fixture: ComponentFixture<FirstnameValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstnameValidatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstnameValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
