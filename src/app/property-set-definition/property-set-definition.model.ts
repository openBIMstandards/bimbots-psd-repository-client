import {PropertyDefinition} from '../property-definition/property-definition.model';

export class PropertySetDefinition {
  id: string;
  name: string;
  definition: string;
  applicableClasses: string[];
  propertyDefs: [PropertyDefinition];
}

export class PropertySetDefinitionInput {
  constructor(private id: string, private name: string, private definition: string, private applicableClasses: string[]) {
  }
}
