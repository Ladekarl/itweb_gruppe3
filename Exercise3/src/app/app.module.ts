import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import { AppComponent } from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { AuthenticateService } from './authenticate/authenticate.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticateGuard } from './authenticate/authenticate.guard';
import { ProgramsService } from './programs/programs.service';
import { ExercisesService } from './exercises/exercises.service';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';
import { NewProgramComponent } from './new-program/new-program.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgramsComponent,
    ExercisesComponent,
    AuthenticateComponent,
    NewExerciseComponent,
    NewProgramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticateService,
    AuthenticateGuard,
    ProgramsService,
    ExercisesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
