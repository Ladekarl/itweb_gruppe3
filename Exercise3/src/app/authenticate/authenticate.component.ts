import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticateService} from './authenticate.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  private loginView: boolean;
  private title: string;
  private email: string;
  private password: string;

  constructor(private router: Router, private authenticateService: AuthenticateService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { login: boolean, register: boolean }) => {
        this.loginView = data.login && !data.register;
        this.title = this.loginView ? 'Login' : 'Register';
      });
  }

  redirectToHomepage() {
    this.router.navigate(['/']);
  }

  login() {
    this.authenticateService.login(this.email, this.password)
      .subscribe(
        () => this.redirectToHomepage(),
        error => alert('Could not login'));
  }

  register() {
    this.authenticateService.register(this.email, this.password)
      .subscribe(
        () => this.redirectToHomepage(),
        error => alert('Could not register'));
  }

  submitClicked() {
    this.loginView ? this.login() : this.register();
  }
}
