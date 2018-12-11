export class PropertyDefinition {
  id: string;
  name: string;
  definition: string;
  propertyType: PropertyType;
}

export class PropertyType {
  type: string;
  dataType: string;
  enumItems: [string];
}
