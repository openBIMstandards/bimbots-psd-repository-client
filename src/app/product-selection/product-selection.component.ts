import {Component, OnInit} from '@angular/core';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertyDefinition} from '../property-definition/property-definition.model';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {
  searchString: string;
  foundPropDefs: [PropertyDefinition];
  selectedPropSetDef: PropertySetDefinition;
  propertySetDefinitions: [PropertySetDefinition];
  classId: string;
  products: string[];
  loadingAllPSDsForClass: boolean;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
    this.products = this.propertySetDefinitionService.getProducts();
  }

  ngOnInit(): void {
    this.searchString = '';
    this.classId = this.products[0];
    this.propertySetDefinitionService.psdsReceived.subscribe(psds => {
      this.propertySetDefinitions = psds;
      this.loadingAllPSDsForClass = false;
    });
    this.loadingAllPSDsForClass = true;
    this.propertySetDefinitionService.allPSDsForClass(this.classId);
  }

  search() {
    if (this.searchString.length > 2) {
      this.propertySetDefinitionService.searchPD(this.searchString).subscribe((value) => this.foundPropDefs = value);
    } else {
      this.foundPropDefs = null;
    }
  }

  getFirstPsdName(propSetDefs: [PropertySetDefinition]): string {
    if (propSetDefs && propSetDefs.length > 0) {
      return propSetDefs[0].name;
    } else {
      return '';
    }
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
