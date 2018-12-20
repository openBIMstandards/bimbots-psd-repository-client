import {PropertySetDefinition, PropertySetDefinitionInput} from './property-set-definition/property-set-definition.model';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';

export interface Query {
  onePSD: PropertySetDefinition;
  allPSDs: [PropertySetDefinition];
  allPSDsForClass: [PropertySetDefinition];
  allIDSs: [InformationDeliverySpecification];
  oneIDS: InformationDeliverySpecification;
}

export interface Mutation {
  // Add a required property set to an information delivery specification
  // GRAPHQL: addPset2Ids(
  //  idsId: String!,
  //  psetId: String!,
  //  propIds: [String]): InformationDeliverySpecification

  addPset2Ids(idsId: string, psetId: string, propIds: [string]): InformationDeliverySpecification;

  // Remove a required property set from an information delivery specification
  // GRAPHQL: removePset2Ids(
  //  idsId: ID!,
  //  psetId: ID!): InformationDeliverySpecification

  removePsetIds(idsId: string, psetId: string): InformationDeliverySpecification;

  // Add a mandatory property to a required property set to an information delivery specification
  // GRAPHQL: addProp2Pset2Ids(
  //  idsId: String!,
  //  psetId: String!,
  //  propId: String!): InformationDeliverySpecification

  addProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;

  // Remove a mandatory property from a required property set to an information delivery specification
  // GRAPHQL: addProp2Pset2Ids(
  //  idsId: String!,
  //  psetId: String!,
  //  propId: String!): InformationDeliverySpecification

  removeProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;

  // Create a property set definition specified by this PropertySetDefinitionInput instance
  // GRAPHQL: createPropertySetDefinition(
  //  psdInput: PropertySetDefinitionInput!): PropertySetDefinition

  createPropertySetDefinition(psdInput: PropertySetDefinitionInput): PropertySetDefinition;
}
