import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropertyDefinitionComponent } from './create-property-definition.component';

describe('CreatePropertyDefinitionComponent', () => {
  let component: CreatePropertyDefinitionComponent;
  let fixture: ComponentFixture<CreatePropertyDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePropertyDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePropertyDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
