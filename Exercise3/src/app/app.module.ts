import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'rxjs/Rx';
import {AppComponent} from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import { ExercisesComponent } from './exercises/exercises.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ExercisesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
