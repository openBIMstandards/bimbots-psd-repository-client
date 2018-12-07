import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {PropertySetDefinition} from './property-set-definition.model';

@Component({
  selector: 'app-property-set-definition',
  templateUrl: './property-set-definition.component.html',
  styleUrls: ['./property-set-definition.component.css']
})
export class PropertySetDefinitionComponent implements OnInit, OnChanges {
  @Input() selectedPropSetDef: PropertySetDefinition;
  selectedPropDef: PropertyDefinition;

  constructor() {
  }

  ngOnInit() {
  }

  selectPropertyDef(propertyDef: PropertyDefinition) {
    this.selectedPropDef = propertyDef;
  }

  sort(propertyDefs: PropertyDefinition[]): PropertyDefinition[] {
    return propertyDefs.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPropSetDef']) {
      this.selectedPropDef = null;
    }
  }

}
