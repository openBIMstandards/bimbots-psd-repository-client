import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {InformationDeliverySpecification, RequiredPropertySet} from './information-delivery-specification.model';
import {PropertyDefinition} from '../property-definition/property-definition.model';

@Component({
  selector: 'app-information-delivery-specification',
  templateUrl: './information-delivery-specification.component.html',
  styleUrls: ['./information-delivery-specification.component.css']
})
export class InformationDeliverySpecificationComponent implements OnInit {
  allIDSs: [InformationDeliverySpecification];
  selectedIDS: InformationDeliverySpecification;
  editedPset: RequiredPropertySet;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.propertySetDefinitionService.idssReceived.subscribe(allIDSs => this.allIDSs = allIDSs);
    this.propertySetDefinitionService.allIDSs();
  }

  onClickIds(ids: InformationDeliverySpecification) {
    if (!ids.reqPsets) {
      this.propertySetDefinitionService.idsReceived.subscribe(oneIDS => {
        ids = oneIDS;
        this.selectedIDS = ids;
      });
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
    for (let index = 0; index < pset.reqProps.length; index++) {
      if (pset.reqProps[index].name === propDef.name) {
        return true;
      }
    }
    return false;
  }

}
