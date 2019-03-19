import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InformationDeliverySpecification} from '../information-delivery-specification.model';

@Component({
  selector: 'app-create-ids',
  templateUrl: './create-ids.component.html',
  styleUrls: ['./create-ids.component.css']
})
export class CreateIdsComponent implements OnInit {
  errorMessage: string;
  ids: InformationDeliverySpecification;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.ids = new InformationDeliverySpecification();
    this.ids.name = 'My IDS';
    this.ids.id = this.generateIdsId(this.ids);
  }

  generateIdsId(ids: InformationDeliverySpecification): string {
    const localName = ids.name.toLowerCase().replace(' ', '_');
    return 'http://openbimstandards.org/information-delivery-specification/' + localName + '#' + localName;
  }

  onCreateClick(): void {
    this.activeModal.close(this.ids);
  }
}
