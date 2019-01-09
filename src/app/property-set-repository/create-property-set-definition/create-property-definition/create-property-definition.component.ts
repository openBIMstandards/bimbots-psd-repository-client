import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertyDefinition, PropertyType} from '../../../property-definition/property-definition.model';

const PROPERTY_TYPES = [
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypeComplexProperty',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertyBoundedValue',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertyEnumeratedValue',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertyListValue',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertyReferenceValue',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertySingleValue',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4-PSD#TypePropertyTableValue'
];

const DATA_TYPES = [
  'http://ifcowl.openbimstandards.org/IFC4#IfcAreaMeasure',
  'http://ifcowl.openbimstandards.org/IFC4#IfcBoolean',
  'http://ifcowl.openbimstandards.org/IFC4#IfcIdentifier',
  'http://ifcowl.openbimstandards.org/IFC4#IfcInteger',
  'http://ifcowl.openbimstandards.org/IFC4#IfcLabel',
  'http://ifcowl.openbimstandards.org/IFC4#IfcLogical',
  'http://ifcowl.openbimstandards.org/IFC4#IfcMassDensityMeasure',
  'http://ifcowl.openbimstandards.org/IFC4#IfcPlanarForceMeasure',
  'http://ifcowl.openbimstandards.org/IFC4#IfcPlaneAngleMeasure',
  'http://ifcowl.openbimstandards.org/IFC4#IfcPositiveLengthMeasure',
  'http://ifcowl.openbimstandards.org/IFC4#IfcThermalTransmittanceMeasure'
];

@Component({
  selector: 'app-create-property-definition',
  templateUrl: './create-property-definition.component.html',
  styleUrls: ['./create-property-definition.component.css']
})
export class CreatePropertyDefinitionComponent implements OnInit {
  types = PROPERTY_TYPES;
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
