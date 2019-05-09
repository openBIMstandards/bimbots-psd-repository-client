import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';

export class PropertyDefinition {
  id: string;
  name: string;
  definition: string;
  propertyType: PropertyType;
  invPropertySetDefinitions: [PropertySetDefinition];
}

export class PropertyType {
  type: string;
  dataType: string;
  enumItems: string[];
  reftype: string;
}

export class PropertyDefinitionInput {
  constructor(private id: string,
              private name: string = null,
              private definition: string = null,
              private propertyType: PropertyTypeInput = null) {
  }
}

export class PropertyTypeInput {
  constructor(private type: string, private dataType: string, private enumItems: string[], private reftype) {
  }
}
