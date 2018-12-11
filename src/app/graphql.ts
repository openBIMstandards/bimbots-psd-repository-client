import {PropertySetDefinition} from './property-set-definition/property-set-definition.model';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';

export interface Query {
  onePSD: PropertySetDefinition;
  allPSDsForClass: [PropertySetDefinition];
  allIDSs: [InformationDeliverySpecification];
  oneIDS: InformationDeliverySpecification;
}

export interface Mutation {
  // Add a mandatory property to a required property set to an information delivery specification
  // GRAPHQL: addProp2Pset2Ids(
  //  idsId: String!
  //  psetId: String!
  //  propId: String!): InformationDeliverySpecification

  addProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;

  // Remove a mandatory property from a required property set to an information delivery specification
  // GRAPHQL: addProp2Pset2Ids(
  //  idsId: String!
  //  psetId: String!
  //  propId: String!): InformationDeliverySpecification

  removeProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;
}
