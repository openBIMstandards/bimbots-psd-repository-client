import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../../property-set-definition.service';

@Component({
  selector: 'app-export-ids',
  templateUrl: './export-ids.component.html',
  styleUrls: ['./export-ids.component.css']
})
export class ExportIdsComponent implements OnInit {
  errorMessage: string;
  exportFormat: string;
  formats: string[];

  constructor(
    public activeModal: NgbActiveModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.formats = <string[]>[
      'MVDXML',
      'PDF',
      'JSON',
      'SPARQL'
    ];
    this.exportFormat = this.formats[1];
  }

  onExportClick(): void {
    this.activeModal.close(this.exportFormat);
  }

}
