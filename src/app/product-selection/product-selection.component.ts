import { Component, OnInit } from '@angular/core';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';

const PRODUCTS = [
  'http://ifcowl.openbimstandards.org/IFC4#IfcBeam',
  'http://ifcowl.openbimstandards.org/IFC4#IfcBuilding',
  'http://ifcowl.openbimstandards.org/IFC4#IfcBuildingStorey',
  'http://ifcowl.openbimstandards.org/IFC4#IfcColumn',
  'http://ifcowl.openbimstandards.org/IFC4#IfcCovering',
  'http://ifcowl.openbimstandards.org/IFC4#IfcDoor',
  'http://ifcowl.openbimstandards.org/IFC4#IfcMaterial',
  'http://ifcowl.openbimstandards.org/IFC4#IfcMember',
  'http://ifcowl.openbimstandards.org/IFC4#IfcOpeningElement',
  'http://ifcowl.openbimstandards.org/IFC4#IfcPile',
  'http://ifcowl.openbimstandards.org/IFC4#IfcPlate',
  'http://ifcowl.openbimstandards.org/IFC4#IfcSlab',
  'http://ifcowl.openbimstandards.org/IFC4#IfcSpace',
  'http://ifcowl.openbimstandards.org/IFC4#IfcStair',
  'http://ifcowl.openbimstandards.org/IFC4#IfcWall',
  'http://ifcowl.openbimstandards.org/IFC4#IfcWindow'
];

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {
  selectedPropSetDef: PropertySetDefinition;
  propertySetDefinitions: [PropertySetDefinition];
  classId: string;
  products: string[];

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
    this.products = PRODUCTS;
  }

  ngOnInit(): void {
    this.classId = this.products[0];
    this.propertySetDefinitionService.psdsReceived.subscribe(psds => {
      this.propertySetDefinitions = psds;
    });
    this.propertySetDefinitionService.allPSDsForClass(this.classId);
  }

  onProductClassSelection(product: string): void {
    this.selectedPropSetDef = null;
    this.propertySetDefinitionService.allPSDsForClass(product);
  }

  selectPropertySetDef(propertySetDef: PropertySetDefinition) {
    const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe(psd => {
      this.selectedPropSetDef = psd;
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.getPropertySetDefinition(propertySetDef.name);
  }

}
