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

  constructor(
    public activeModal: NgbActiveModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
  }

  login(): void {
    console.log('Login button clicked');
    const subscription = <Subscription>this.propertySetDefinitionService.signinPayloadReceived.subscribe(payload => {
      this.payload = <SigninPayload>payload;
      localStorage.token = this.payload ? this.payload.token : null;
      if (this.payload && this.payload.user) {
        this.activeModal.close(this.payload.user);
      }
      subscription.unsubscribe();
    });
    this.propertySetDefinitionService.signinUser(new AuthData(this.email, this.password));
  }
}
