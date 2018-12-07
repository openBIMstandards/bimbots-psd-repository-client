import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySetDefinitionComponent } from './property-set-definition.component';

describe('PropertySetDefinitionComponent', () => {
  let component: PropertySetDefinitionComponent;
  let fixture: ComponentFixture<PropertySetDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySetDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySetDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
