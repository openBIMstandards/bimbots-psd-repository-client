import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {User} from './graphql';
import {PropertySetDefinitionService} from './property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {faList} from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  faList = faList;

  constructor(
    private modal: NgbModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit(): void {
    if (!this.propertySetDefinitionService.user) {
      sessionStorage.removeItem('token');
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogin(): void {
    if (this.getToken() == null) {
      const modal = this.modal.open(LoginComponent);
      modal.result.then((user) => {
        console.log('Logged in: ' + (<User>user).name);
        this.propertySetDefinitionService.user = user;
      }, (reason) => console.log('Login rejected: ' + reason));
    } else {
      const subscription = <Subscription>this.propertySetDefinitionService.signoutResult.subscribe((result) => {
        console.log('Logout result value: ' + result);
        subscription.unsubscribe();
      });
      this.propertySetDefinitionService.signoutUser(sessionStorage.getItem('token'));
      sessionStorage.removeItem('token');
      this.propertySetDefinitionService.user = null;
    }
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getUserInfo(): string {
    return this.propertySetDefinitionService.user ? 'user: ' + this.propertySetDefinitionService.user.name : 'user not logged in';
  }
}
