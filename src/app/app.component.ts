import {Component, OnInit} from '@angular/core';
import {PropertySetDefinition} from './property-set-definition/property-set-definition.model';
import {PropertySetDefinitionService} from './property-set-definition.service';
import {PropertyDefinition} from './property-definition/property-definition.model';
import {Subscription} from 'apollo-client/util/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
