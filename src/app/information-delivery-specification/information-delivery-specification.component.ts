import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  InformationDeliverySpecification,
  RequiredPropertySet
} from './information-delivery-specification.model';
import {ExportIdsComponent} from './export-ids/export-ids.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Globals} from '../globals';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {faEdit, faExternalLinkAlt, faMinus, faPlus, faTrash} from '@fortawesome/fontawesome-free-solid';
import {User} from '../graphql';

@Component({
  selector: 'app-information-delivery-specification',
  templateUrl: './information-delivery-specification.component.html',
  styleUrls: ['./information-delivery-specification.component.css']
})
export class InformationDeliverySpecificationComponent implements OnInit, OnChanges {
  faEdit = faEdit;
  faExternalLinkAlt = faExternalLinkAlt;
  faMinus = faMinus;
  faPlus = faPlus;
  faTrash = faTrash;
  @Input() selectedIDS: InformationDeliverySpecification;
  @Input() allIDSs: [InformationDeliverySpecification];
  @Output() deleteIDS = new EventEmitter<InformationDeliverySpecification>();
  exportLink: string;
  selectedPset: RequiredPropertySet;
  selectedMergeIDS: InformationDeliverySpecification;
  editedPset: RequiredPropertySet;
  allPSDs: [PropertySetDefinition];
  selectedPSD: PropertySetDefinition;
  loadingPsetUpdate: boolean;
  loadingPropUpdate: boolean;
  loadingIdsUpdate: boolean;

  constructor(public propertySetDefinitionService: PropertySetDefinitionService,
              private modal: NgbModal,
              public globals: Globals) {
  }

  ngOnInit() {
    this.exportLink = null;
    this.propertySetDefinitionService.allIDSs();
    this.propertySetDefinitionService.psdsReceived.subscribe(allPSDs => {
      this.allPSDs = allPSDs;
    });
    this.propertySetDefinitionService.allPSDs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedIDS']) {
      this.exportLink = null;
    }
  }

  onClickExport(): void {
    const modal = this.modal.open(ExportIdsComponent);
    modal.result.then((result) => {
      this.propertySetDefinitionService.exportLink.subscribe((link) => this.exportLink = link);
      this.propertySetDefinitionService.exportIDS(this.selectedIDS.id, <string>result);
    }, (reason) => console.log('Export rejected: ', reason));
  }

  getHost(): string {
    return this.globals.serverAddress;
  }

  selectPset(pset: RequiredPropertySet): void {
    this.selectedPset = pset === this.selectedPset ? null : pset;
  }

  toggleEditedPset(pset: RequiredPropertySet): void {
    if (pset === this.editedPset) {
      this.editedPset = null;
    } else {
      this.editedPset = pset;
    }
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

  getOtherIDSs(): [InformationDeliverySpecification] {
    return <[InformationDeliverySpecification]>this.allIDSs.filter((value) => value.id !== this.selectedIDS.id);
  }

  mergeIDS(mergeIds: InformationDeliverySpecification): void {
    this.loadingIdsUpdate = true;
    this.propertySetDefinitionService.addIds2Ids(this.selectedIDS.id, mergeIds.id).subscribe((ids) => {
      this.selectedIDS = ids;
      this.selectedMergeIDS = null;
      this.loadingIdsUpdate = false;
    });
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

  onDeleteIDS(): void {
    this.deleteIDS.emit(this.selectedIDS);
  }

  isOwner(): boolean {
    const owner = this.selectedIDS.owner;
    const user = this.propertySetDefinitionService.user;
    return (owner.id && user.id) ? owner.id === user.id : false;
  }

}
