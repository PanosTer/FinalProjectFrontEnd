import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostSearchByUserIdComponent } from './crud-post-search-userid.component';

describe('CrudPostSearchByUserIdComponent', () => {
  let component: CrudPostSearchByUserIdComponent;
  let fixture: ComponentFixture<CrudPostSearchByUserIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrudPostSearchByUserIdComponent]
    });
    fixture = TestBed.createComponent(CrudPostSearchByUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});