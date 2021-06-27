import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCredentialsComponent } from './search-credentials.component';

describe('SearchCredentialsComponent', () => {
  let component: SearchCredentialsComponent;
  let fixture: ComponentFixture<SearchCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
