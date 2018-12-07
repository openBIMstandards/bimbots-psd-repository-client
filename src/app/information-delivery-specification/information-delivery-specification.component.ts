import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {InformationDeliverySpecification} from './information-delivery-specification.model';

@Component({
  selector: 'app-information-delivery-specification',
  templateUrl: './information-delivery-specification.component.html',
  styleUrls: ['./information-delivery-specification.component.css']
})
export class InformationDeliverySpecificationComponent implements OnInit {
  allIDSs: [InformationDeliverySpecification];
  selectedIDS: InformationDeliverySpecification;

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

}
