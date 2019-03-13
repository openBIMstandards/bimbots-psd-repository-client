/* tslint:disable:max-line-length */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppComponent} from './app.component';
import {PropertySetDefinitionComponent} from './property-set-definition/property-set-definition.component';
import {PropertyDefinitionComponent} from './property-definition/property-definition.component';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpClientModule} from '@angular/common/http';
import {ProductSelectionComponent} from './product-selection/product-selection.component';
import {InformationDeliverySpecificationRepositoryComponent} from './information-delivery-specification-repository/information-delivery-specification-repository.component';
import {InformationDeliverySpecificationComponent} from './information-delivery-specification/information-delivery-specification.component';
import {PropertySetRepositoryComponent} from './property-set-repository/property-set-repository.component';
import {CreatePropertySetDefinitionComponent} from './property-set-repository/create-property-set-definition/create-property-set-definition.component';
import {CreatePropertyDefinitionComponent} from './property-set-repository/create-property-set-definition/create-property-definition/create-property-definition.component';
import {LoginComponent} from './login/login.component';
import {ExportIdsComponent} from './information-delivery-specification/export-ids/export-ids.component';
import {Globals} from './globals';
import {CreateIdsComponent} from './information-delivery-specification/create-ids/create-ids.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'property_set_repository', component: PropertySetRepositoryComponent},
  {path: 'information_delivery_specification_repository', component: InformationDeliverySpecificationRepositoryComponent},
  {path: 'products', component: ProductSelectionComponent}
];
const link = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

@NgModule({
  declarations: [
    AppComponent,
    PropertySetDefinitionComponent,
    PropertyDefinitionComponent,
    ProductSelectionComponent,
    InformationDeliverySpecificationRepositoryComponent,
    InformationDeliverySpecificationComponent,
    PropertySetRepositoryComponent,
    CreatePropertySetDefinitionComponent,
    CreatePropertyDefinitionComponent,
    LoginComponent,
    ExportIdsComponent,
    CreateIdsComponent
  ],
  entryComponents: [
    LoginComponent,
    CreatePropertySetDefinitionComponent,
    CreatePropertyDefinitionComponent,
    CreateIdsComponent,
    ExportIdsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    globals: Globals
  ) {
    const http = httpLink.create({uri: globals.serverAddress + '/graphql'});
    // const http = httpLink.create({uri: 'https://gentle-lake-13895.herokuapp.com/graphql'});
    // const http = httpLink.create({uri: 'http://app.informationdeliveryspecification.org/graphql'});

    const auth = setContext((_, {headers}) => {
      // get the authentication token from local storage if it exists
      const token = sessionStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          //         headers: headers.append('Authorization', `Bearer ${token}`)
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      }
    });

    // apollo.create({
    //   // By default, this client will send queries to the
    //   // `/graphql` endpoint on the same host
    //   link: httpLink.create({uri: 'http://localhost:8080/graphql'}),
    //   // link: httpLink.create({uri: 'https://gentle-lake-13895.herokuapp.com/graphql'}),
    //   cache: new InMemoryCache()
    // });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });

  }
}
