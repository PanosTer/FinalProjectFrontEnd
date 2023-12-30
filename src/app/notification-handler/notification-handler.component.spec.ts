import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHandlerComponent } from './notification-handler.component';

describe('CreatePostComponent', () => {
  let component: NotificationHandlerComponent;
  let fixture: ComponentFixture<NotificationHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationHandlerComponent]
    });
    fixture = TestBed.createComponent(NotificationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
