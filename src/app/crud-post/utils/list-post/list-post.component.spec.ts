import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostsComponent } from './list-post.component';

describe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPostsComponent]
    });
    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
