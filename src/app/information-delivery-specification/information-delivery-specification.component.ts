import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {InformationDeliverySpecification, RequiredPropertySet} from './information-delivery-specification.model';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {LoginComponent} from '../login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportIdsComponent} from './export-ids/export-ids.component';

@Component({
  selector: 'app-information-delivery-specification',
  templateUrl: './information-delivery-specification.component.html',
  styleUrls: ['./information-delivery-specification.component.css']
})
export class InformationDeliverySpecificationComponent implements OnInit {
  allIDSs: [InformationDeliverySpecification];
  selectedIDS: InformationDeliverySpecification;
  allPSDs: [PropertySetDefinition];
  selectedPSD: PropertySetDefinition;
  editedPset: RequiredPropertySet;
  selectedPset: RequiredPropertySet;
  loadingAllIDSs: boolean;
  loadingOneIDS: boolean;
  loadingPsetUpdate: boolean;
  loadingPropUpdate: boolean;
  loadingIDS: InformationDeliverySpecification;

  constructor(private modal: NgbModal,
              private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.loadingAllIDSs = true;
    this.propertySetDefinitionService.idssReceived.subscribe(allIDSs => {
      this.allIDSs = allIDSs;
      this.loadingAllIDSs = false;
    });
    this.propertySetDefinitionService.allIDSs();
    this.propertySetDefinitionService.psdsReceived.subscribe(allPSDs => {
      this.allPSDs = allPSDs;
    });
    this.propertySetDefinitionService.allPSDs();
  }

  isLoadingIDS(ids: InformationDeliverySpecification): boolean {
    return ids === this.loadingIDS;
  }

  onClickIds(ids: InformationDeliverySpecification) {
    if (!ids.reqPsets) {
      this.propertySetDefinitionService.idsReceived.subscribe(oneIDS => {
        ids = oneIDS;
        this.selectedIDS = ids;
        this.loadingIDS = null;
      });
      this.loadingIDS = ids;
      this.propertySetDefinitionService.oneIDS(ids.id);
    } else {
      this.selectedIDS = ids;
    }
  }

  onClickExport(): void {
    const modal = this.modal.open(ExportIdsComponent);
    modal.result.then((result) => {
      this.propertySetDefinitionService.exportLink.subscribe((link) => alert(link));
      this.propertySetDefinitionService.exportIDS(this.selectedIDS.id, <string>result);
    });
  }

  addPset(selectedPSD: PropertySetDefinition): void {
    const subscription = <Subscription>this.propertySetDefinitionService.idsReceived.subscribe(ids => {
      this.selectedIDS = ids;
      this.selectedPSD = null;
      this.loadingPsetUpdate = false;
      subscription.unsubscribe();
    });
    this.loadingPsetUpdate = true;
    this.propertySetDefinitionService.addPset2Ids(this.selectedIDS.id, selectedPSD.id);
  }

  removePset(pset: RequiredPropertySet): void {
    const subscription = <Subscription>this.propertySetDefinitionService.idsReceived.subscribe(ids => {
      this.selectedIDS = ids;
      this.selectedPSD = null;
      this.loadingPsetUpdate = false;
      subscription.unsubscribe();
    });
    this.loadingPsetUpdate = true;
    this.propertySetDefinitionService.removePset2Ids(this.selectedIDS.id, pset.propertySetDef.id);
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

  selectPset(pset: RequiredPropertySet): void {
    this.selectedPset = pset === this.selectedPset ? null : pset;
  }

}
