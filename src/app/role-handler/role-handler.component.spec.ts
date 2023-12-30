import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHandlerComponent } from './role-handler.component';

describe('RoleHandlerComponent', () => {
  let component: RoleHandlerComponent;
  let fixture: ComponentFixture<RoleHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoleHandlerComponent]
    });
    fixture = TestBed.createComponent(RoleHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
