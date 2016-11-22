import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExercisesService } from './exercises.service';
import { Exercise } from '../exercise';
import { Trainingprogram } from  '../trainingprogram'
import { ProgramsService } from '../programs/programs.service'
import { Location } from '@angular/common';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  private exercises: Exercise[] = [];
  private programId: string;

  constructor(private router: Router, private route: ActivatedRoute, private exercisesService: ExercisesService,
    private cd: ChangeDetectorRef,private programsService: ProgramsService,private location: Location) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((data: { id: string }) => {
        this.programId = data.id;
      });

    this.exercisesService.getExercises(this.programId)
      .subscribe(ex => {
        this.exercises = ex;
        this.cd.detectChanges();
      },
      error => alert(error));
  }

  goToNewExercise() {
    this.router.navigate(['newexercise'], { queryParams: { id: this.programId } });
  }
  onCompleted() {
    this.programsService.updateProgramCompleted(this.programId,true)
      .subscribe(
        program => this.location.back(),
        error => alert(error)
      )
  }

  deleteExercise(exercise: Exercise) {
    this.exercisesService.deleteExercise(exercise, this.programId)
      .subscribe(res => {
        this.exercises.splice(this.exercises.indexOf(exercise));
      },
      error => alert(error));
  }
}
