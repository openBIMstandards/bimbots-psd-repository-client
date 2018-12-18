import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';

@Component({
  selector: 'app-property-set-repository',
  templateUrl: './property-set-repository.component.html',
  styleUrls: ['./property-set-repository.component.css']
})
export class PropertySetRepositoryComponent implements OnInit {
  allPSDs: [PropertySetDefinition];

  constructor(private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.propertySetDefinitionService.psdsReceived.subscribe(allPSDs => this.allPSDs = allPSDs);
    this.propertySetDefinitionService.allPSDs();
  }

}
