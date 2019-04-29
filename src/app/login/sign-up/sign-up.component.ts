import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PropertySetDefinitionService} from '../../property-set-definition.service';
import {AuthData} from '../../graphql';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  hideValue: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private propertySetDefinitionService: PropertySetDefinitionService) {
  }

  ngOnInit() {
    this.hideValue = true;
  }

  signUp(): void {
    const authData = new AuthData(this.email, this.password);
    authData.name = this.name;
    this.propertySetDefinitionService.signupUser(authData).subscribe(value => {
      this.activeModal.close(value);
    });
  }
}
