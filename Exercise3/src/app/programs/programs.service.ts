import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../authenticate/authenticate.service';

@Injectable()
export class ProgramsService {

  private programsUrl = '/api/trainingPrograms';

  private static extractData(res: Response) {
    return res.json() || [];
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

  constructor(private http: Http) {

  }

  getPrograms() {
    let headers = new Headers({'x-access-token': AuthenticateService.getToken()});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.programsUrl, options)
      .map(ProgramsService.extractData)
      .catch(ProgramsService.handleError);
  }
}
