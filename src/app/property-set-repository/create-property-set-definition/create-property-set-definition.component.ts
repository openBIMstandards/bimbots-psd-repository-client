import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinition, PropertySetDefinitionInput} from '../../property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from '../../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';

@Component({
  selector: 'app-create-property-set-definition',
  templateUrl: './create-property-set-definition.component.html',
  styleUrls: ['./create-property-set-definition.component.css']
})
export class CreatePropertySetDefinitionComponent implements OnInit {
  pset: PropertySetDefinition;

  constructor(public activeModal: NgbActiveModal,
              private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    console.log('Start CreatePropertySetDefinitionComponent');
    this.pset = new PropertySetDefinition();
  }

  create(): void {
    this.pset.id = 'http://openbimstandards.org/pset_repository#' + this.pset.name.replace(/\s/g, '_');
    const psdInput = new PropertySetDefinitionInput(this.pset.id, this.pset.name);
    const subscription = <Subscription>this.propertySetDefinitionService.psdReceived.subscribe(value => {
      this.activeModal.close(value);
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.createPropertySetDefinition(psdInput);
  }

}
