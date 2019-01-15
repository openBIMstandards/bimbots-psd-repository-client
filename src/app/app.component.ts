import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';
import {User} from './graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  loginBtnText: string;

  constructor(private modal: NgbModal) {
    this.loginBtnText = 'login';
  }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogin(): void {
    console.log('Show login popup window');
    const modal = this.modal.open(LoginComponent);
    modal.result.then((user) => {
      console.log('Logged in: ' + (<User>user).name);
      this.loginBtnText = 'logout';
    }, (reason) => console.log('Login rejected: ' + reason));
  }
}
