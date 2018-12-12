import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {InformationDeliverySpecification, RequiredPropertySet} from './information-delivery-specification.model';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {Subscription} from 'apollo-client/util/Observable';

@Component({
  selector: 'app-information-delivery-specification',
  templateUrl: './information-delivery-specification.component.html',
  styleUrls: ['./information-delivery-specification.component.css']
})
export class InformationDeliverySpecificationComponent implements OnInit {
  allIDSs: [InformationDeliverySpecification];
  selectedIDS: InformationDeliverySpecification;
  editedPset: RequiredPropertySet;
  loadingAllIDSs: boolean;
  loadingOneIDS: boolean;
  loadingPropUpdate: boolean;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.loadingAllIDSs = true;
    this.propertySetDefinitionService.idssReceived.subscribe(allIDSs => {
      this.allIDSs = allIDSs;
      this.loadingAllIDSs = false;
    });
    this.propertySetDefinitionService.allIDSs();
  }

  onClickIds(ids: InformationDeliverySpecification) {
    if (!ids.reqPsets) {
      this.propertySetDefinitionService.idsReceived.subscribe(oneIDS => {
        ids = oneIDS;
        this.selectedIDS = ids;
        this.loadingOneIDS = false;
      });
      this.loadingOneIDS = true;
      this.propertySetDefinitionService.oneIDS(ids.id);
    } else {
      this.selectedIDS = ids;
    }
  }

  toggleEditedPset(pset: RequiredPropertySet): void {
    if (pset === this.editedPset) {
      this.editedPset = null;
    } else {
      this.editedPset = pset;
    }
  }

  isChecked(propDef: PropertyDefinition, pset: RequiredPropertySet): boolean {
    if (pset.reqProps) {
      for (let index = 0; index < pset.reqProps.length; index++) {
        if (pset.reqProps[index].name === propDef.name) {
          return true;
        }
      }
    }
    return false;
  }

  onChange(propdef: PropertyDefinition, pset: RequiredPropertySet): void {
    const subscription = <Subscription>this.propertySetDefinitionService.idsReceived.subscribe(ids => {
      this.selectedIDS = ids;
      this.loadingPropUpdate = false;
      subscription.unsubscribe();
    });
    this.loadingPropUpdate = true;
    if (this.isChecked(propdef, pset)) {
      this.propertySetDefinitionService.removeProp2Pset2Ids(this.selectedIDS.id, this.editedPset.propertySetDef.id, propdef.id);
    } else {
      this.propertySetDefinitionService.addProp2Pset2Ids(this.selectedIDS.id, this.editedPset.propertySetDef.id, propdef.id);
    }
  }

}
