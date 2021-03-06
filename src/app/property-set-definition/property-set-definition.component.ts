import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PropertyDefinition, PropertyDefinitionInput, PropertyTypeInput} from '../property-definition/property-definition.model';
import {PropertySetDefinition, PropertySetDefinitionInput} from './property-set-definition.model';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {faEdit, faTrash} from '@fortawesome/fontawesome-free-solid';
// tslint:disable-next-line:max-line-length
import {CreatePropertyDefinitionComponent} from '../property-set-repository/create-property-set-definition/create-property-definition/create-property-definition.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-property-set-definition',
  templateUrl: './property-set-definition.component.html',
  styleUrls: ['./property-set-definition.component.css']
})
export class PropertySetDefinitionComponent implements OnInit, OnChanges {
  faEdit = faEdit;
  faTrash = faTrash;
  @Input() selectedPropSetDef: PropertySetDefinition;
  @Output() propDefUpdated = new EventEmitter<PropertyDefinition>();
  @Output() deletePSD = new EventEmitter<PropertySetDefinition>();
  selectedPropDef: PropertyDefinition;
  selectedItem: string;
  editedItem: string;
  products: string[];
  applicableProduct: string;
  selectedPD: PropertyDefinition;
  allPDs: [PropertyDefinition];

  constructor(public propertySetDefinitionService: PropertySetDefinitionService,
              private modal: NgbModal) {
  }

  ngOnInit() {
    this.products = this.propertySetDefinitionService.getProducts();
    this.propertySetDefinitionService.pdsReceived.subscribe((allPDs) => this.allPDs = allPDs);
    this.propertySetDefinitionService.allPDs();
  }

  onDeletePSD(): void {
    this.deletePSD.emit(this.selectedPropSetDef);
  }

  isOwner(): boolean {
    const owner = this.selectedPropSetDef.owner;
    const user = this.propertySetDefinitionService.user;
    return (owner && user) ? owner.id === user.id : false;
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
    const pdsInput = <PropertyDefinitionInput[]> [];
    if (this.selectedPropSetDef.propertyDefs) {
      for (let index = 0; index < this.selectedPropSetDef.propertyDefs.length; index++) {
        pdsInput.push(new PropertyDefinitionInput(
          this.selectedPropSetDef.propertyDefs[index].id
        ));
      }
    }
    const psdInput = new PropertySetDefinitionInput(
      this.selectedPropSetDef.id,
      this.selectedPropSetDef.name,
      this.propertySetDefinitionService.user.id,
      this.selectedPropSetDef.definition,
      this.selectedPropSetDef.applicableClasses,
      this.selectedPropSetDef.propertyDefs ? pdsInput : null);
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

  addPropertyDef(): void {
    if (this.selectedPropSetDef) {
      if (!this.selectedPropSetDef.propertyDefs) {
        this.selectedPropSetDef.propertyDefs = <PropertyDefinition[]>[];
      }
      this.selectedPropSetDef.propertyDefs.push(this.selectedPD);
      this.selectedPD = null;
    }
  }

  removePropertyDef(propertyDef): void {
    if (this.selectedPropSetDef) {
      const index = this.selectedPropSetDef.propertyDefs.indexOf(propertyDef);
      this.selectedPropSetDef.propertyDefs.splice(index, 1);
    }
  }

  createPropertyDef(): void {
    const modal = this.modal.open(CreatePropertyDefinitionComponent);
    modal.result.then((result) => {
      console.log('CreatePropertyDefinitionComponent fulfilled');
      if (!this.selectedPropSetDef.propertyDefs) {
        this.selectedPropSetDef.propertyDefs = <PropertyDefinition[]>[];
      }
      this.selectedPropSetDef.propertyDefs.push(<PropertyDefinition>result);
      const pdInputs = <PropertyDefinitionInput[]>[];
      for (let index = 0; index < this.selectedPropSetDef.propertyDefs.length; index++) {
        pdInputs.push(new PropertyDefinitionInput(
          this.selectedPropSetDef.propertyDefs[index].id,
          this.selectedPropSetDef.propertyDefs[index].name,
          this.selectedPropSetDef.propertyDefs[index].definition,
          new PropertyTypeInput(
            this.selectedPropSetDef.propertyDefs[index].propertyType.type,
            this.selectedPropSetDef.propertyDefs[index].propertyType.dataType,
            this.selectedPropSetDef.propertyDefs[index].propertyType.enumItems,
            this.selectedPropSetDef.propertyDefs[index].propertyType.reftype
          )
        ));
      }
      const psdInput = new PropertySetDefinitionInput(
        this.selectedPropSetDef.id,
        this.selectedPropSetDef.name,
        this.propertySetDefinitionService.user.id,
        this.selectedPropSetDef.definition,
        this.selectedPropSetDef.applicableClasses,
        pdInputs);
      this.propertySetDefinitionService.updatePropertySetDefinition(psdInput);
    }, () => {
      console.log('CreatePropertyDefinitionComponent rejected');
    });
  }
}
