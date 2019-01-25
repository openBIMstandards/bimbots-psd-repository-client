import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InformationDeliverySpecification} from '../information-delivery-specification.model';

@Component({
  selector: 'app-create-ids',
  templateUrl: './create-ids.component.html',
  styleUrls: ['./create-ids.component.css']
})
export class CreateIdsComponent implements OnInit {
  ids: InformationDeliverySpecification;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.ids = new InformationDeliverySpecification();
  }

  onCreateClick(): void {
  }
}
