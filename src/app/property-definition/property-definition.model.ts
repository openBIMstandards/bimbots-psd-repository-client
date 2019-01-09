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

export class PropertyDefinitionInput {
  constructor(private name: string, private propertyType: PropertyTypeInput) {
  }
}

export class PropertyTypeInput {
  constructor(private type: string) {
  }
}
