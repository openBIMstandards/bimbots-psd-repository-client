import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {PropertySetDefinition, PropertySetDefinitionInput} from './property-set-definition.model';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertySetDefinitionService} from '../property-set-definition.service';

@Component({
  selector: 'app-property-set-definition',
  templateUrl: './property-set-definition.component.html',
  styleUrls: ['./property-set-definition.component.css']
})
export class PropertySetDefinitionComponent implements OnInit, OnChanges {
  @Input() selectedPropSetDef: PropertySetDefinition;
  @Output() propDefUpdated = new EventEmitter<PropertyDefinition>();
  selectedPropDef: PropertyDefinition;
  selectedItem: string;
  editedItem: string;
  products: string[];
  applicableProduct: string;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.products = this.propertySetDefinitionService.getProducts();
  }

  selectPropertyDef(propertyDef: PropertyDefinition) {
    if (this.selectedPropDef) {
      this.selectedPropDef = this.selectedPropDef.name === propertyDef.name ? null : propertyDef;
    } else {
      this.selectedPropDef = propertyDef;
    }

  }

  sort(propertyDefs: PropertyDefinition[]): PropertyDefinition[] {
    if (propertyDefs) {
      return propertyDefs.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPropSetDef']) {
      this.selectedPropDef = null;
    }
  }

  selectItem(itemName: string): void {
    this.selectedItem = itemName === this.selectedItem ? null : itemName;
  }

  editItem(itemName: string): void {
    if (this.editedItem) {
      this.editedItem = null;
      this.update();
    } else {
      this.editedItem = itemName === this.editedItem ? null : itemName;
    }
  }

  update(): void {
    const psdInput = new PropertySetDefinitionInput(
      this.selectedPropSetDef.id,
      this.selectedPropSetDef.name,
      this.selectedPropSetDef.definition,
      this.selectedPropSetDef.applicableClasses, null);
    const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe(value => {
      this.propDefUpdated.emit(value);
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.updatePropertySetDefinition(psdInput);
  }

  addApplicableClass(): void {
    if (this.selectedPropSetDef) {
      if (!this.selectedPropSetDef.applicableClasses) {
        this.selectedPropSetDef.applicableClasses = [];
      }
      this.selectedPropSetDef.applicableClasses.push(this.applicableProduct);
      this.applicableProduct = null;
    }
  }

  removeApplicableClass(applicableClass): void {
    if (this.selectedPropSetDef) {
      const index = this.selectedPropSetDef.applicableClasses.indexOf(applicableClass);
      this.selectedPropSetDef.applicableClasses.splice(index, 1);
    }
  }

}
