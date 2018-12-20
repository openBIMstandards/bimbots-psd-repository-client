import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertySetDefinitionComponent } from './create-property-set-definition.component';

describe('CreatePropertySetDefinitionComponent', () => {
  let component: CreatePropertySetDefinitionComponent;
  let fixture: ComponentFixture<CreatePropertySetDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePropertySetDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropertySetDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
