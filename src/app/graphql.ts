import {PropertySetDefinition, PropertySetDefinitionInput} from './property-set-definition/property-set-definition.model';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';
import {PropertyDefinition} from './property-definition/property-definition.model';

export interface Query {
  onePSD: PropertySetDefinition;
  allPSDs: [PropertySetDefinition];
  allPSDsForClass: [PropertySetDefinition];
  allPDs: [PropertyDefinition];
  searchPD: [PropertyDefinition];
  allIDSs: [InformationDeliverySpecification];
  oneIDS: InformationDeliverySpecification;
}

export interface Mutation {
  /*
    Create an information delivery specification.
    GRAPHQL: createInformationDeliverySpecification(
      idsId: ID!,
      name: String!,
      ownerId: ID!,
      parentId: ID): InformationDeliverySpecification
  */
  createInformationDeliverySpecification(idsId: string, name: string, ownerId: string, parentId: string): InformationDeliverySpecification;

  /*
    Delete an information delivery specification
    GRAPHQL: deleteInformationDeliverySpecification(
      idsId: ID!): Boolean
  */
  deleteInformationDeliverySpecification(idsId: string): boolean;

  /*
    Add the content of another information delivery specification to this information delivery specification.
    GRAPHQL: addIds2Ids(thisIdsId: ID!, otherIdsId: ID!): InformationDeliverySpecification
   */
  addIds2Ids(thisIdsId: string, otherIdsId: string): InformationDeliverySpecification;

  /*
    Add a required property set to an information delivery specification
    GRAPHQL: addPset2Ids(
     idsId: String!,
     psetId: String!,
     propIds: [String]): InformationDeliverySpecification
  */
  addPset2Ids(idsId: string, psetId: string, propIds: [string]): InformationDeliverySpecification;

  /*
    Remove a required property set from an information delivery specification
    GRAPHQL: removePset2Ids(
     idsId: ID!,
     psetId: ID!): InformationDeliverySpecification
  */
  removePsetIds(idsId: string, psetId: string): InformationDeliverySpecification;

  /*
    Add a mandatory property to a required property set to an information delivery specification
    GRAPHQL: addProp2Pset2Ids(
     idsId: String!,
     psetId: String!,
     propId: String!): InformationDeliverySpecification
  */
  addProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;

  /*
    Remove a mandatory property from a required property set to an information delivery specification
    GRAPHQL: addProp2Pset2Ids(
     idsId: String!,
     psetId: String!,
     propId: String!): InformationDeliverySpecification
  */
  removeProp2Pset2Ids(idsId: string, psetId: string, propId: string): InformationDeliverySpecification;

  /*
    Create a property set definition specified by this PropertySetDefinitionInput instance
    GRAPHQL: createPropertySetDefinition(
     psdInput: PropertySetDefinitionInput!): PropertySetDefinition
  */
  createPropertySetDefinition(psdInput: PropertySetDefinitionInput): PropertySetDefinition;

  /*
    Update a property set definition specified by this PropertySetDefinitionInput instance
    GRAPHQL: updatePropertySetDefinition(
     psdInput: PropertySetDefinitionInput!): PropertySetDefinition
  */
  updatePropertySetDefinition(psdInput: PropertySetDefinitionInput): PropertySetDefinition;

  /*
    Delete a property set definition
    GRAPHQL: deletePropertySetDefinition(
     psetId: ID!): Boolean
  */
  deletePropertySetDefinition(psetId: string): boolean;

  /*
    Sign in a user.
    GRAPHQL: signinUser(auth: AuthData): SigninPayload
  */
  signinUser(auth: AuthData): SigninPayload;

  /*
    Sign out a user.
    GRAPHQL: signoutUser(token: String!): Boolean!
  */
  signoutUser(token: string): boolean;

  /*
    Export IDS, a link to the result is the return value
    GRAPHQL: exportIDS(id: ID!, format: ExportFormat!): String
  */
  exportIDS(id: string, format: string): string;
}

export class SigninPayload {
  token: string;
  user: User;
  error: string;
}

export class User {
  id: string;
  name: string;
  email: string;
}

export class AuthData {
  constructor(private email: string, private password: string) {
  }
}
