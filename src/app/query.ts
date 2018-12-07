import {PropertySetDefinition} from './property-set-definition/property-set-definition.model';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';

export interface Query {
  onePSD: PropertySetDefinition;
  allPSDsForClass: [PropertySetDefinition];
  allIDSs: [InformationDeliverySpecification];
  oneIDS: InformationDeliverySpecification;
}
