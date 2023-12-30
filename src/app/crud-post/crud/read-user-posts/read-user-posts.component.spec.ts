import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUsersPostComponent } from './read-user-posts.component';

describe('PostsComponent', () => {
  let component: ReadUsersPostComponent;
  let fixture: ComponentFixture<ReadUsersPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReadUsersPostComponent]
    });
    fixture = TestBed.createComponent(ReadUsersPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
