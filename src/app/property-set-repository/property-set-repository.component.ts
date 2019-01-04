import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {Subscription} from 'apollo-client/util/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatePropertySetDefinitionComponent} from './create-property-set-definition/create-property-set-definition.component';

@Component({
  selector: 'app-property-set-repository',
  templateUrl: './property-set-repository.component.html',
  styleUrls: ['./property-set-repository.component.css']
})
export class PropertySetRepositoryComponent implements OnInit {
  allPSDs: [PropertySetDefinition];
  selectedPSD: PropertySetDefinition;
  loadingAllPSDs: boolean;
  loadingOnePSD: string;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService,
              private modal: NgbModal) {
  }

  ngOnInit() {
    this.propertySetDefinitionService.psdsReceived.subscribe(allPSDs => {
      this.allPSDs = allPSDs;
      if (this.selectedPSD) {
        for (let i = 0; i < this.allPSDs.length; i++) {
          if (this.allPSDs[i].id === this.selectedPSD.id) {
            this.selectPsd(this.allPSDs[i]);
            break;
          }
        }
      }
      this.loadingAllPSDs = false;
    });
    this.loadingAllPSDs = true;
    this.propertySetDefinitionService.allPSDs();
  }

  trackById(index: number, item: PropertySetDefinition) {
    return item.id; // or item.id
  }

  isSelected(psd): boolean {
    return this.selectedPSD ? psd.id === this.selectedPSD.id : false;
  }

  selectPsd(psd: PropertySetDefinition): void {
    if (psd) {
      const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe((onePSD) => {
          psd = onePSD;
          this.selectedPSD = psd;
          this.loadingOnePSD = null;
        }
      );
      this.loadingOnePSD = psd.name;
      this.propertySetDefinitionService.getPropertySetDefinition(psd.name);
    } else {
      this.selectedPSD = null;
    }
  }

  isLoadingOnePSD(psd): boolean {
    return psd.name === this.loadingOnePSD;
  }

  onAddPropertySet(): void {
    const modal = this.modal.open(CreatePropertySetDefinitionComponent);
    modal.result.then((result) => {
      this.selectPsd(result);
    });
  }

  onDeletePropertySet(pset: PropertySetDefinition): void {
    const subscription = <Subscription>this.propertySetDefinitionService.psdDeleted.subscribe((value) => {
      this.selectedPSD = null;
      console.log('Result delete property set definition: ' + value);
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.deletePropertySetDefinition(pset.id);
  }
}
