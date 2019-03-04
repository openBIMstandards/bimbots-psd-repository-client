import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../property-set-definition.service';
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
    this.errorMessage = undefined;
  }


  login(): void {
    this.errorMessage = undefined;
    console.log('login ' + this.email + '/' + this.password);
    const subscription = this.propertySetDefinitionService.signinUser(new AuthData(this.email, this.password))
      .subscribe(
        payload => {
          this.payload = <SigninPayload>payload;
          console.log('login token ' + this.payload.token);
          if (this.payload.token) {
            sessionStorage.setItem('token', this.payload.token);
          } else {
            sessionStorage.removeItem('token');
          }
          if (this.payload.user) {
            this.activeModal.close(this.payload.user);
          } else {
            console.log('login error ' + this.payload.error);
            this.errorMessage = this.payload.error;
          }
        },
        message => {
          console.log('login error ' + message);
          sessionStorage.removeItem('token');
          this.errorMessage = message;
        },
        () => {
          console.log('login complete');
          subscription.unsubscribe();
        }
      );
  }

  closeAlert(): void {
    this.errorMessage = undefined;
    this.activeModal.close(null);
  }
}
