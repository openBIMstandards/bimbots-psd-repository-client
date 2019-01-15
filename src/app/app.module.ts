/* tslint:disable:max-line-length */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {AppComponent} from './app.component';
import {PropertySetDefinitionComponent} from './property-set-definition/property-set-definition.component';
import {PropertyDefinitionComponent} from './property-definition/property-definition.component';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpClientModule} from '@angular/common/http';
import {ProductSelectionComponent} from './product-selection/product-selection.component';
import {InformationDeliverySpecificationComponent} from './information-delivery-specification/information-delivery-specification.component';
import {PropertySetRepositoryComponent} from './property-set-repository/property-set-repository.component';
import {CreatePropertySetDefinitionComponent} from './property-set-repository/create-property-set-definition/create-property-set-definition.component';
import {CreatePropertyDefinitionComponent} from './property-set-repository/create-property-set-definition/create-property-definition/create-property-definition.component';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  {path: 'property_set_repository', component: PropertySetRepositoryComponent},
  {path: 'information_delivery_specification', component: InformationDeliverySpecificationComponent},
  {path: 'products', component: ProductSelectionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PropertySetDefinitionComponent,
    PropertyDefinitionComponent,
    ProductSelectionComponent,
    InformationDeliverySpecificationComponent,
    PropertySetRepositoryComponent,
    CreatePropertySetDefinitionComponent,
    CreatePropertyDefinitionComponent,
    LoginComponent
  ],
  entryComponents: [LoginComponent, CreatePropertySetDefinitionComponent, CreatePropertyDefinitionComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http_localhost = httpLink.create({uri: 'http://localhost:8080/graphql'});
    const http = httpLink.create({uri: 'https://gentle-lake-13895.herokuapp.com/graphql'});

    const auth = setContext((_, {headers}) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
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
      link: auth.concat(http_localhost),
      // link: auth.concat(http),
      cache: new InMemoryCache()
    });

  }
}
