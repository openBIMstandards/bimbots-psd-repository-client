import { TestBed, inject } from '@angular/core/testing';

import { PropertySetDefinitionService } from './property-set-definition.service';

describe('PropertySetDefinitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertySetDefinitionService]
    });
  });

  it('should be created', inject([PropertySetDefinitionService], (service: PropertySetDefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
