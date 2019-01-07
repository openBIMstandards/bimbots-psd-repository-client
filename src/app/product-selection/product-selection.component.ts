import { Component, OnInit } from '@angular/core';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';

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
  loadingAllPSDsForClass: boolean;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
    this.products = this.propertySetDefinitionService.getProducts();
  }

  ngOnInit(): void {
    this.classId = this.products[0];
    this.propertySetDefinitionService.psdsReceived.subscribe(psds => {
      this.propertySetDefinitions = psds;
      this.loadingAllPSDsForClass = false;
    });
    this.loadingAllPSDsForClass = true;
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
