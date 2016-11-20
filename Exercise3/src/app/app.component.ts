import {Component} from '@angular/core';
import {AuthenticateService} from './authenticate/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor() {
  }

  isLoggedIn() {
    return AuthenticateService.isLoggedIn();
  }
}
