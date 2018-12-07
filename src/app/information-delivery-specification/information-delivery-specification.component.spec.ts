import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDeliverySpecificationComponent } from './information-delivery-specification.component';

describe('InformationDeliverySpecificationComponent', () => {
  let component: InformationDeliverySpecificationComponent;
  let fixture: ComponentFixture<InformationDeliverySpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationDeliverySpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDeliverySpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
