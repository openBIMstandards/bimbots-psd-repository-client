import {EventEmitter, Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {PropertySetDefinition} from './property-set-definition/property-set-definition.model';
import {Query} from './query';
import {InformationDeliverySpecification} from './information-delivery-specification/information-delivery-specification.model';

const onePSD = gql`
  query onePSD($name: String!) {
    onePSD(name: $name) {
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

const allPSDsForClass = gql`
  query allPSDsForClass($classId: String!) {
    allPSDsForClass(classId: $classId) {
      name
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
  query oneIDS($id: String!) {
    oneIDS(id: $id) {
      id
      name
      reqPsets {
        propertySetDef {
          name
        }
        reqProps {
          name
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class PropertySetDefinitionService {
  public psdReceived = new EventEmitter<PropertySetDefinition>();
  public psdsReceived = new EventEmitter<[PropertySetDefinition]>();
  public idsReceived = new EventEmitter<InformationDeliverySpecification>();
  public idssReceived = new EventEmitter<[InformationDeliverySpecification]>();

  constructor(private apollo: Apollo) {
  }

  public getPropertySetDefinition(psdName: string): void {
    this.apollo.watchQuery<Query>({
      query: onePSD,
      variables: {name: psdName}
    }).valueChanges.subscribe(value => this.psdReceived.emit(value.data.onePSD));
  }

  public allPSDsForClass(classId: string): void {
    this.apollo.watchQuery<Query>({
      query: allPSDsForClass,
      variables: {classId: classId}
    }).valueChanges.subscribe(values => this.psdsReceived.emit(values.data.allPSDsForClass));
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
}
