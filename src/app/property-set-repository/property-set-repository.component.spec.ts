import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySetRepositoryComponent } from './property-set-repository.component';

describe('PropertySetRepositoryComponent', () => {
  let component: PropertySetRepositoryComponent;
  let fixture: ComponentFixture<PropertySetRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySetRepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySetRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
