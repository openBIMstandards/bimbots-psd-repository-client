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
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcAreaMeasure',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcBoolean',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcIdentifier',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcInteger',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcLabel',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcLogical',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcMassDensityMeasure',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcPlanarForceMeasure',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcPlaneAngleMeasure',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcPositiveLengthMeasure',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcThermalTransmittanceMeasure'
];

@Component({
  selector: 'app-create-property-definition',
  templateUrl: './create-property-definition.component.html',
  styleUrls: ['./create-property-definition.component.css']
})
export class CreatePropertyDefinitionComponent implements OnInit {
  types = PROPERTY_TYPES;
  dataTypes = DATA_TYPES;
  propDef: PropertyDefinition;
  item: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.propDef = new PropertyDefinition();
    this.propDef.propertyType = new PropertyType();
    this.propDef.propertyType.type = this.types[5];
  }

  onChangeType(): void {
    if (this.propDef.propertyType.type == this.types[2]) {
      this.propDef.propertyType.dataType = null;
    } else {
      this.propDef.propertyType.enumItems = null;
    }
  }

  addItem(): void {
    if (!this.propDef.propertyType.enumItems) {
      this.propDef.propertyType.enumItems = [];
    }
    this.propDef.propertyType.enumItems.push(this.item);
    this.item = null;
  }

  create(): void {
    this.activeModal.close(this.propDef);
  }

}
