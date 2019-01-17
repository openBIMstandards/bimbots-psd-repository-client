import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {Subscription} from 'apollo-client/util/Observable';
import {AuthData, SigninPayload} from '../graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  payload: SigninPayload;
  errorMessage: string;

  constructor(
    public activeModal: NgbActiveModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.errorMessage = null;
    const subscription = <Subscription>this.propertySetDefinitionService.signinPayloadReceived.subscribe(payload => {
        this.payload = <SigninPayload>payload;
        if (payload) {
          sessionStorage.setItem('token', payload.token);
        } else {
          sessionStorage.removeItem('token');
        }
        if (this.payload && this.payload.user) {
          this.activeModal.close(this.payload.user);
        }
      }, message => {
        console.log(message);
        sessionStorage.removeItem('token');
        this.errorMessage = message;
      }, () => subscription.unsubscribe()
      )
    ;
    this.propertySetDefinitionService.signinUser(new AuthData(this.email, this.password));
  }

  closeAlert(): void {
    this.errorMessage = null;
  }
}
