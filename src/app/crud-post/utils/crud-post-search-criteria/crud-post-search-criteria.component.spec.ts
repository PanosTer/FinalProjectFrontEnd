import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPostSearchComponent } from './crud-post-search-criteria.component';

describe('CrudPostSearchComponent', () => {
  let component: CrudPostSearchComponent;
  let fixture: ComponentFixture<CrudPostSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrudPostSearchComponent]
    });
    fixture = TestBed.createComponent(CrudPostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
