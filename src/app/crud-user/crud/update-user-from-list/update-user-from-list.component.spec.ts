import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserListComponent } from './update-user-from-list.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserListComponent;
  let fixture: ComponentFixture<UpdateUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateUserListComponent]
    });
    fixture = TestBed.createComponent(UpdateUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
