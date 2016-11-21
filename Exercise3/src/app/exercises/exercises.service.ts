import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticateService} from '../authenticate/authenticate.service';


@Injectable()
export class ExercisesService {

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

  getExercises(id: string) {
    let exerciseUrl = '/api/trainingPrograms/' + id + '/exercises';
    let headers = new Headers({'x-access-token': AuthenticateService.getToken()});
    let options = new RequestOptions({headers: headers});

    return this.http.get(exerciseUrl, options)
      .map((res: Response) => {
        let data = res.json() || [];
        return data.exerciseList ? data.exerciseList : data;
      })
      .catch(ExercisesService.handleError);
  }
