import {PropertyDefinition} from '../property-definition/property-definition.model';

export class PropertySetDefinition {
  id: string;
  name: string;
  definition: string;
  applicableClasses: [string];
  propertyDefs: [PropertyDefinition];
}
