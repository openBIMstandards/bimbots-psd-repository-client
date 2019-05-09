import {Component, Input, OnInit} from '@angular/core';
import {PropertyDefinition} from './property-definition.model';

@Component({
  selector: 'app-property-definition',
  templateUrl: './property-definition.component.html',
  styleUrls: ['./property-definition.component.css']
})
export class PropertyDefinitionComponent implements OnInit {
  @Input() selectedPropDef: PropertyDefinition;

  constructor() {
  }

  ngOnInit() {
  }

  getPropertyType(): string {
    return (this.selectedPropDef) ? this.selectedPropDef.propertyType.type.substr(this.selectedPropDef.propertyType.type.indexOf('#')) : '';
  }

}
