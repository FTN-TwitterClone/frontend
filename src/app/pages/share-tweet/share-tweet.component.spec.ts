import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTweetComponent } from './share-tweet.component';

describe('ShareTweetComponent', () => {
  let component: ShareTweetComponent;
  let fixture: ComponentFixture<ShareTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
