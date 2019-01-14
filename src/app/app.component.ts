import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private modal: NgbModal) {
  }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogin(): void {
    console.log('Show login popup window');
    const modal = this.modal.open(LoginComponent);
    modal.result.then((result) => {
      console.log('Login window fulfilled.');
    });
  }
}
