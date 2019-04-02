import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InformationDeliverySpecification, InformationDeliverySpecificationInput} from '../information-delivery-specification.model';
import {PropertySetDefinitionService} from '../../property-set-definition.service';

@Component({
  selector: 'app-create-ids',
  templateUrl: './create-ids.component.html',
  styleUrls: ['./create-ids.component.css']
})
export class CreateIdsComponent implements OnInit {
  allIDSs: [InformationDeliverySpecification];
  errorMessage: string;
  ids: InformationDeliverySpecificationInput;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.propertySetDefinitionService.idssReceived.subscribe(allIDSs => {
      this.allIDSs = allIDSs;
    });
    this.propertySetDefinitionService.allIDSs();

    this.ids = new InformationDeliverySpecificationInput();
  }

  onIdsNameChange() {
    this.ids.id = this.ids ? this.generateIdsId(this.ids) : null;
  }


  private generateIdsId(ids: InformationDeliverySpecificationInput): string {
    const localName = ids.name.toLowerCase().replace(/ /g, '_');
    return 'http://openbimstandards.org/information-delivery-specification/' + localName + '#' + localName;
  }

  onCreateClick(): void {
    this.activeModal.close(this.ids);
  }
}
