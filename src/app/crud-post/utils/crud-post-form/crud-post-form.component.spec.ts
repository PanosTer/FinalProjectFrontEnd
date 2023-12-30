import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostFormComponent } from './crud-post-form.component';

describe('CrudPostFormComponent', () => {
  let component: CrudPostFormComponent;
  let fixture: ComponentFixture<CrudPostFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrudPostFormComponent]
    });
    fixture = TestBed.createComponent(CrudPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
