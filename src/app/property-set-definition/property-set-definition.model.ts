import {PropertyDefinition, PropertyDefinitionInput} from '../property-definition/property-definition.model';
import {User} from '../graphql';

export class PropertySetDefinition {
  id: string;
  name: string;
  definition: string;
  applicableClasses: string[];
  propertyDefs: PropertyDefinition[];
  owner: User;
}

export class PropertySetDefinitionInput {
  constructor(private id: string,
              private name: string,
              private ownerId: string,
              private definition: string,
              private applicableClasses: string[],
              private propertyDefs: PropertyDefinitionInput[]) {
  }
}
