import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  constructor(private http: Http) {
    this.http.get('/api/')
      .map(res => res.text())
      .subscribe(
        data => this.title = data,
        err => this.title = err,
        () => console.log('Random Quote Complete')
      );
  }

  title = 'app works!';
}
