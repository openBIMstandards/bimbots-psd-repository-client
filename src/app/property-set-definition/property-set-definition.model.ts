import {PropertyDefinition} from '../property-definition/property-definition.model';

export class PropertySetDefinition {
  name: string;
  definition: string;
  applicableClasses: [string];
  propertyDefs: [PropertyDefinition];
}
