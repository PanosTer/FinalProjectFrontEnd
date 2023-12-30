import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserPasswordComponent } from './update-user-password.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserPasswordComponent;
  let fixture: ComponentFixture<UpdateUserPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateUserPasswordComponent]
    });
    fixture = TestBed.createComponent(UpdateUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
