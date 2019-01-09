import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertyDefinition, PropertyType} from '../../../property-definition/property-definition.model';

const TYPES = [
  'TypeComplexProperty',
  'TypePropertyBoundedValue',
  'TypePropertyEnumeratedValue',
  'TypePropertyListValue',
  'TypePropertyReferenceValue',
  'TypePropertySingleValue',
  'TypePropertyTableValue'
];

@Component({
  selector: 'app-create-property-definition',
  templateUrl: './create-property-definition.component.html',
  styleUrls: ['./create-property-definition.component.css']
})
export class CreatePropertyDefinitionComponent implements OnInit {
  types = TYPES;
  propDef: PropertyDefinition;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.propDef = new PropertyDefinition();
    this.propDef.propertyType = new PropertyType();
    this.propDef.propertyType.type = this.types[5];
  }

  create(): void {
    this.activeModal.close(this.propDef);
  }

}
