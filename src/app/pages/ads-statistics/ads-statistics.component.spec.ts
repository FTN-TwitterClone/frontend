import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsStatisticsComponent } from './ads-statistics.component';

describe('AdsStatisticsComponent', () => {
  let component: AdsStatisticsComponent;
  let fixture: ComponentFixture<AdsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
