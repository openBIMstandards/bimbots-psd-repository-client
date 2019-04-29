import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../property-set-definition.service';
import {AuthData, SigninPayload, User} from '../graphql';
import {SignUpComponent} from './sign-up/sign-up.component';

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
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.errorMessage = undefined;
  }

  signUp(): void {
    const modal = this.modal.open(SignUpComponent, {size: 'sm'});
    modal.result.then((success) => {
      console.log('Signed up: ' + success);
      modal.close();
      alert('Signed up: ' + success);
      this.activeModal.close();
    }, (reason) => console.log('Sign up rejected: ' + reason));
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
