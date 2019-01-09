import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinition, PropertySetDefinitionInput} from '../../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {CreatePropertyDefinitionComponent} from './create-property-definition/create-property-definition.component';
import {PropertyDefinitionInput, PropertyTypeInput} from '../../property-definition/property-definition.model';

@Component({
  selector: 'app-create-property-set-definition',
  templateUrl: './create-property-set-definition.component.html',
  styleUrls: ['./create-property-set-definition.component.css']
})
export class CreatePropertySetDefinitionComponent implements OnInit {
  pset: PropertySetDefinition;
  products: string[];
  applicableProduct: string;

  constructor(public activeModal: NgbActiveModal,
              private modal: NgbModal,
              private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.products = this.propertySetDefinitionService.getProducts();
    this.pset = new PropertySetDefinition();
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
        this.pset.propertyDefs = [];
      }
      this.pset.propertyDefs.push(result);
    }, () => {
      console.log('CreatePropertyDefinitionComponent rejected');
    });
  }


  create(): void {
    this.pset.id = 'http://openbimstandards.org/pset_repository#' + this.pset.name.replace(/\s/g, '_');
    const propDefInputs = [];
    if (this.pset.propertyDefs) {
      for (let index = 0; index < this.pset.propertyDefs.length; index++) {
        propDefInputs.push(new PropertyDefinitionInput(this.pset.propertyDefs[index].name,
          new PropertyTypeInput(this.pset.propertyDefs[index].propertyType.type)));
      }
    }
    const psdInput =
      new PropertySetDefinitionInput(this.pset.id, this.pset.name, this.pset.definition, this.pset.applicableClasses, propDefInputs);
    const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe(value => {
      this.activeModal.close(value);
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.createPropertySetDefinition(psdInput);
  }

}
