export class PropertyDefinition {
  name: String;
  definition: String;
  propertyType: PropertyType;
}

export class PropertyType {
  type: String;
  dataType: String;
  enumItems: [String];
}
