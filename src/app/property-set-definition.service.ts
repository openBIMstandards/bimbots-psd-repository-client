import {EventEmitter, Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {PropertySetDefinition, PropertySetDefinitionInput} from './property-set-definition/property-set-definition.model';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';
import {AuthData, Mutation, Query, SigninPayload, User} from './graphql';
import {PropertyDefinition} from './property-definition/property-definition.model';

const PRODUCTS = [
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcBeam',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcBuilding',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcBuildingStorey',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4##IfcChimney',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcColumn',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcCovering',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcDoor',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcMaterial',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcMember',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcOpeningElement',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcPile',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcPlate',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcSlab',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcSpace',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcStair',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcWall',
  'http://www.buildingsmart-tech.org/ifcOWL/IFC4#IfcWindow'
];

const signinUser = gql`
  mutation signinUser($auth: AuthData!) {
    signinUser(auth: $auth) {
      token
      user {
        id
        name
      }
    }
  }
`;

const signoutUser = gql`
  mutation signoutUser($token: String!) {
    signoutUser(token: $token)
  }
`;

const onePSD = gql`
  query onePSD($name: String!) {
    onePSD(name: $name) {
      id
      name
      definition
      applicableClasses
      propertyDefs {
        id
        name
        definition
        propertyType {
          type
          dataType
          enumItems
        }
      }
    }
  }
`;

const allPSDs = gql`
  query allPSDs {
    allPSDs {
      id
      name
    }
  }
`;

const allPSDsForClass = gql`
  query allPSDsForClass($classId: ID!) {
    allPSDsForClass(classId: $classId) {
      name
    }
  }
`;

const allPDs = gql`
  query allPDs {
    allPDs {
      id
      name
      invPropertySetDefinitions {
        id
        name
      }
    }
  }
`;

const allIDSs = gql`
  query allIDSs {
    allIDSs {
      id
      name
    }
  }
`;

const oneIDS = gql`
  query oneIDS($id: ID!) {
    oneIDS(id: $id) {
      id
      name
      reqPsets {
        propertySetDef {
          id
          name
          propertyDefs {
            id
            name
          }
        }
        reqProps {
          name
        }
      }
    }
  }
`;

const createInformationDeliverySpecification = gql`
  mutation createInformationDeliverySpecification($idsId: ID!, $name: String!, $parentId: ID) {
    createInformationDeliverySpecification(idsId: $idsId, name: $name, parentId: $parentId) {
      id
      name
    }
  }
`;

const exportIDS = gql`
  mutation exportIDS($id: ID!, $format: ExportFormat!) {
    exportIDS(id: $id, format: $format)
  }
`;

const addPset2Ids = gql`
  mutation addPset2Ids($idsId: ID!, $psetId: ID!, $propIds: [ID]) {
    addPset2Ids(idsId: $idsId, psetId: $psetId, propIds: $propIds) {
      id
      name
      reqPsets {
        propertySetDef {
          id
          name
          propertyDefs {
            id
            name
          }
        }
        reqProps {
          name
        }
      }
    }
  }
`;

const removePset2Ids = gql`
  mutation removePset2Ids($idsId: ID!, $psetId: ID!) {
    removePset2Ids(idsId: $idsId, psetId: $psetId) {
      id
      name
      reqPsets {
        propertySetDef {
          id
          name
          propertyDefs {
            id
            name
          }
        }
        reqProps {
          name
        }
      }
    }
  }
`;

const addProp2Pset2Ids = gql`
  mutation addProp2Pset2Ids($idsId: ID!, $psetId: ID!, $propId: ID!) {
    addProp2Pset2Ids(idsId: $idsId, psetId: $psetId, propId: $propId) {
      id
      name
      reqPsets {
        propertySetDef {
          id
          name
          propertyDefs {
            id
            name
          }
        }
        reqProps {
          name
        }
      }
    }
  }
`;

const removeProp2Pset2Ids = gql`
  mutation removeProp2Pset2Ids($idsId: ID!, $psetId: ID!, $propId: ID!) {
    removeProp2Pset2Ids(idsId: $idsId, psetId: $psetId, propId: $propId) {
      id
      name
      reqPsets {
        propertySetDef {
          id
          name
          propertyDefs {
            id
            name
          }
        }
        reqProps {
          name
        }
      }
    }
  }
`;

const createPropertySetDefinition = gql`
  mutation createPropertySetDefinition($psdInput: PropertySetDefinitionInput!) {
    createPropertySetDefinition(psdInput: $psdInput) {
      id
      name
    }
  }
`;

const updatePropertySetDefinition = gql`
  mutation updatePropertySetDefinition($psdInput: PropertySetDefinitionInput!) {
    updatePropertySetDefinition(psdInput: $psdInput) {
      id
      name
      definition
      applicableClasses
      propertyDefs {
        name
        definition
        propertyType {
          type
          dataType
          enumItems
        }
      }
    }
  }
`;

const deletePropertySetDefinition = gql`
  mutation deletePropertySetDefinition($psetId: ID!) {
    deletePropertySetDefinition(psetId: $psetId)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class PropertySetDefinitionService {
  public user: User;

  public signinPayloadReceived = new EventEmitter<SigninPayload>();
  public signoutResult = new EventEmitter<boolean>();
  public psdReceived = new EventEmitter<PropertySetDefinition>();
  public psdsReceived = new EventEmitter<[PropertySetDefinition]>();
  public pdsReceived = new EventEmitter<[PropertyDefinition]>();
  public idsReceived = new EventEmitter<InformationDeliverySpecification>();
  public idssReceived = new EventEmitter<[InformationDeliverySpecification]>();
  public psdDeleted = new EventEmitter<boolean>();
  public exportLink = new EventEmitter();
  public informationDeliverySpecificationCreated = new EventEmitter<InformationDeliverySpecification>();

  constructor(private apollo: Apollo) {
  }

  public getProducts(): string[] {
    return PRODUCTS;
  }

  public getPropertySetDefinition(psdName: string): void {
    this.apollo.watchQuery<Query>({
      query: onePSD,
      variables: {name: psdName}
    }).valueChanges.subscribe(value => this.psdReceived.emit(value.data.onePSD));
  }

  public allPSDs(): void {
    this.apollo.watchQuery<Query>({
      query: allPSDs
    }).valueChanges.subscribe(values => this.psdsReceived.emit(values.data.allPSDs));
  }

  public allPSDsForClass(classId: string): void {
    this.apollo.watchQuery<Query>({
      query: allPSDsForClass,
      variables: {classId: classId}
    }).valueChanges.subscribe(values => this.psdsReceived.emit(values.data.allPSDsForClass));
  }

  public allPDs(): void {
    this.apollo.watchQuery<Query>({
      query: allPDs
    }).valueChanges.subscribe(values => this.pdsReceived.emit(values.data.allPDs));
  }

  public allIDSs(): void {
    this.apollo.watchQuery<Query>({
      query: allIDSs
    }).valueChanges.subscribe(values => this.idssReceived.emit(values.data.allIDSs));
  }

  public oneIDS(id: string): void {
    this.apollo.watchQuery<Query>({
      query: oneIDS,
      variables: {id: id}
    }).valueChanges.subscribe(value => this.idsReceived.emit(value.data.oneIDS));
  }

  public exportIDS(id: string, exportFormat: string): void {
    this.apollo.mutate<Mutation>({
      mutation: exportIDS,
      variables: {
        id: id,
        format: exportFormat
      }
    }).subscribe(value => {
      this.exportLink.emit(value.data.exportIDS);
    });
  }

  public createInformationDeliverySpecification(id: string, name: string): void {
    this.apollo.mutate<Mutation>(
      {
        mutation: createInformationDeliverySpecification,
        variables: {
          idsId: id,
          name: name
        },
        refetchQueries: [{
          query: allIDSs
        }]
      }
    ).subscribe(value => {
      if (value.errors) {
        this.informationDeliverySpecificationCreated.error(value.errors[0].message);
      } else {
        this.informationDeliverySpecificationCreated.emit(value.data.createInformationDeliverySpecification);
      }
    });
  }

  public signinUser(auth: AuthData): void {
    this.apollo.mutate<Mutation>({
      mutation: signinUser,
      variables: {
        auth: auth
      }
    }).subscribe(
      value => {
        if (value.errors) {
          this.signinPayloadReceived.error(value.errors[0].message);
        } else {
          this.signinPayloadReceived.emit(value.data.signinUser);
        }
      },
      null,
      () => this.apollo.getClient().resetStore());
  }

  public signoutUser(token: string): void {
    this.apollo.mutate<Mutation>({
      mutation: signoutUser,
      variables: {
        token: token
      }
    }).subscribe(value => this.signoutResult.emit(value.data.signoutUser));
  }

  public addPset2Ids(idsId: string, psetId: string): void {
    this.apollo.mutate<Mutation>({
      mutation: addPset2Ids,
      variables: {
        idsId: idsId,
        psetId: psetId
      }
    }).subscribe(value => this.idsReceived.emit(value.data.addPset2Ids));
  }

  public removePset2Ids(idsId: string, psetId: string): void {
    this.apollo.mutate<Mutation>({
      mutation: removePset2Ids,
      variables: {
        idsId: idsId,
        psetId: psetId
      }
    }).subscribe(value => this.idsReceived.emit(value.data.removePset2Ids));
  }

  public addProp2Pset2Ids(idsId: string, psetId: string, propId: string): void {
    this.apollo.mutate<Mutation>({
      mutation: addProp2Pset2Ids,
      variables: {
        idsId: idsId,
        psetId: psetId,
        propId: propId
      }
    }).subscribe(value => this.idsReceived.emit(value.data.addProp2Pset2Ids));
  }

  public removeProp2Pset2Ids(idsId: string, psetId: string, propId: string): void {
    this.apollo.mutate<Mutation>({
      mutation: removeProp2Pset2Ids,
      variables: {
        idsId: idsId,
        psetId: psetId,
        propId: propId
      }
    }).subscribe(value => this.idsReceived.emit(value.data.removeProp2Pset2Ids));
  }

  public createPropertySetDefinition(psdInput: PropertySetDefinitionInput) {
    let result = null;
    this.apollo.mutate<Mutation>({
      mutation: createPropertySetDefinition,
      variables: {
        psdInput
      },
      refetchQueries: [{
        query: allPSDs
      }]
    }).subscribe(
      (value) => {
        if (value.errors) {
          this.psdReceived.error(value.errors[0].message);
        } else {
          result = value.data.createPropertySetDefinition;
        }
      },
      null,
      () => {
        if (result) {
          this.psdReceived.emit(result);
        }
      }
    );
  }

  public updatePropertySetDefinition(psdInput: PropertySetDefinitionInput) {
    let result = null;
    this.apollo.mutate<Mutation>({
      mutation: updatePropertySetDefinition,
      variables: {
        psdInput
      },
      refetchQueries: [{
        query: allPSDs
      }]
    }).subscribe((
      value) => result = value.data.updatePropertySetDefinition,
      null,
      () => this.psdReceived.emit(result));
  }

  public deletePropertySetDefinition(psetId: string): void {
    let result = false;
    this.apollo.mutate<Mutation>({
      mutation: deletePropertySetDefinition,
      variables: {
        psetId
      },
      refetchQueries: [{
        query: allPSDs
      }]
    }).subscribe(
      (value) => {
        result = value.data.deletePropertySetDefinition;
        if (value.errors) {
          this.psdDeleted.error(value.errors[0].message);
        } else {
          result = value.data.deletePropertySetDefinition;
        }
      },
      null,
      () => this.psdDeleted.emit(result));
  }

}
