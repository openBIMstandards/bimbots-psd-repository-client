import {Component, OnInit} from '@angular/core';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {InformationDeliverySpecification} from '../information-delivery-specification/information-delivery-specification.model';
import {CreateIdsComponent} from '../information-delivery-specification/create-ids/create-ids.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faPlusCircle, faSpinner} from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-information-delivery-specification-repository',
  templateUrl: './information-delivery-specification-repository.component.html',
  styleUrls: ['./information-delivery-specification-repository.component.css']
})
export class InformationDeliverySpecificationRepositoryComponent implements OnInit {
  faSpinner = faSpinner;
  faPlusCircle = faPlusCircle;
  loadingAllIDSs: boolean;
  loadingIDS: InformationDeliverySpecification;
  allIDSs: [InformationDeliverySpecification];
  selectedIDS: InformationDeliverySpecification;

  constructor(private propertySetDefinitionService: PropertySetDefinitionService,
              private modal: NgbModal) {
  }

  ngOnInit() {
    this.loadingAllIDSs = true;
    this.propertySetDefinitionService.idssReceived.subscribe(allIDSs => {
      this.allIDSs = allIDSs;
      this.loadingAllIDSs = false;
    });
    this.propertySetDefinitionService.allIDSs();
  }

  getToken(): string {
    return sessionStorage.token;
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

  onAddIdsClicked(): void {
    const modal = this.modal.open(CreateIdsComponent);
    modal.result.then((result) => {
      const subscription = this.propertySetDefinitionService.informationDeliverySpecificationCreated.subscribe(
        (value) => {
          alert(value.name);
        },
        message => alert(message));
      this.propertySetDefinitionService.createInformationDeliverySpecification(result.id, result.name);
    });
  }
}
