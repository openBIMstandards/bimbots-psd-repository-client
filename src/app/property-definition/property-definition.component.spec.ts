import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDefinitionComponent } from './property-definition.component';

describe('PropertyDefinitionComponent', () => {
  let component: PropertyDefinitionComponent;
  let fixture: ComponentFixture<PropertyDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
