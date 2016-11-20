import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticateService {

  private static loginUrl = '/api/accounts/login';
  private static registerUrl = '/api/accounts';
  private static tokenKey = 'token';

  private static handleSuccess(res: Response) {
    let body = res.json();
    if (body && body.token) {
      localStorage.setItem(AuthenticateService.tokenKey, body.token);
      return true;
    } else {
      Observable.throw('Could not login');
    }
  }

  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  static logout() {
    localStorage.removeItem(AuthenticateService.tokenKey);
  }

  static isLoggedIn() {
    return AuthenticateService.getToken() ? true : false;
  }

  static getToken() {
    return localStorage.getItem(AuthenticateService.tokenKey);
  }

  constructor(private http: Http) {

  }

  login(email: string, password: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let account = {email: email, password: password};

    return this.http.post(AuthenticateService.loginUrl, account, options)
      .map(AuthenticateService.handleSuccess)
      .catch(AuthenticateService.handleError);
  }

  register(email: string, password: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let account = {email: email, password: password};

    return this.http.post(AuthenticateService.registerUrl, account, options)
      .map(AuthenticateService.handleSuccess)
      .catch(AuthenticateService.handleError);
  }

}
