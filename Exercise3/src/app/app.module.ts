import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import 'rxjs/Rx';
import {AppComponent} from './app.component';
import {ProgramsComponent} from './programs/programs.component';
import {ExercisesComponent} from './exercises/exercises.component';
import {AuthenticateService} from './authenticate/authenticate.service';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticateGuard} from './authenticate/authenticate.guard';
import {ProgramsService} from './programs/programs.service';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ExercisesComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticateService,
    AuthenticateGuard,
    ProgramsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
