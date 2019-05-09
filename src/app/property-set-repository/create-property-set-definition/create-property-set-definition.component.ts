import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinition, PropertySetDefinitionInput} from '../../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {CreatePropertyDefinitionComponent} from './create-property-definition/create-property-definition.component';
import {PropertyDefinition, PropertyDefinitionInput, PropertyTypeInput} from '../../property-definition/property-definition.model';

@Component({
  selector: 'app-create-property-set-definition',
  templateUrl: './create-property-set-definition.component.html',
  styleUrls: ['./create-property-set-definition.component.css']
})
export class CreatePropertySetDefinitionComponent implements OnInit {
  pset: PropertySetDefinition;
  products: string[];
  applicableProduct: string;
  allPDs: [PropertyDefinition];
  selectedPD: PropertyDefinition;
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal,
              private modal: NgbModal,
              private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.errorMessage = null;
    this.pset = new PropertySetDefinition();
    this.products = this.propertySetDefinitionService.getProducts();
    this.propertySetDefinitionService.pdsReceived.subscribe((values) => this.allPDs = <[PropertyDefinition]>values);
    this.propertySetDefinitionService.allPDs();
  }

  addApplicableClass(): void {
    if (this.pset) {
      if (!this.pset.applicableClasses) {
        this.pset.applicableClasses = [];
      }
      this.pset.applicableClasses.push(this.applicableProduct);
      this.applicableProduct = null;
    }
  }

  onAddProperty(): void {
    const modal = this.modal.open(CreatePropertyDefinitionComponent);
    modal.result.then((result) => {
      console.log('CreatePropertyDefinitionComponent fulfilled');
      if (!this.pset.propertyDefs) {
        this.pset.propertyDefs = <[PropertyDefinition]>[];
      }
      this.pset.propertyDefs.push(result);
    }, () => {
      console.log('CreatePropertyDefinitionComponent rejected');
    });
  }

  addPropertyDef(): void {
    if (!this.pset.propertyDefs) {
      this.pset.propertyDefs = <[PropertyDefinition]>[];
    }
    this.pset.propertyDefs.push(this.selectedPD);
    this.selectedPD = null;
  }


  create(): void {
    const psetName = this.pset.name.replace(/\s/g, '_');
    this.pset.id = 'http://openbimstandards.org/pset_repository/' + psetName + '#' + psetName;
    const propDefInputs = <[PropertyDefinitionInput]>[];
    if (this.pset.propertyDefs) {
      for (let index = 0; index < this.pset.propertyDefs.length; index++) {
        if (this.pset.propertyDefs[index].id) {
          propDefInputs.push(new PropertyDefinitionInput(this.pset.propertyDefs[index].id));
        } else {
          propDefInputs.push(new PropertyDefinitionInput(
            null,
            this.pset.propertyDefs[index].name,
            this.pset.propertyDefs[index].definition,
            new PropertyTypeInput(
              this.pset.propertyDefs[index].propertyType.type,
              this.pset.propertyDefs[index].propertyType.dataType,
              this.pset.propertyDefs[index].propertyType.enumItems,
              this.pset.propertyDefs[index].propertyType.reftype)));
        }
      }
    }
    const psdInput =
      new PropertySetDefinitionInput(
        this.pset.id,
        this.pset.name,
        this.propertySetDefinitionService.user.id,
        this.pset.definition,
        this.pset.applicableClasses, propDefInputs);
    const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe(value => {
      this.activeModal.close(value);
      subscription.unsubscribe();
    }, (message) => {
      console.log(message);
//        alert(message);
      sessionStorage.removeItem('token');
      this.errorMessage = message;
    });
    this.propertySetDefinitionService.createPropertySetDefinition(psdInput);
  }

  closeAlert(): void {
    this.activeModal.close();
  }
}
