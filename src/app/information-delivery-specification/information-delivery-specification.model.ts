import {PropertySetDefinition} from '../property-set-definition/property-set-definition.model';
import {PropertyDefinition} from '../property-definition/property-definition.model';
import {User} from '../graphql';

export class RequiredPropertySet {
  propertySetDef: PropertySetDefinition;
  reqProps: [PropertyDefinition];
}

export class InformationDeliverySpecification {
  id: string;
  name: string;
  reqPsets: [RequiredPropertySet];
  owner: User;
}
