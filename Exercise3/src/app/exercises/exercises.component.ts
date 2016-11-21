import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExercisesService } from './exercises.service';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  private exercises: Exercise[] = [];
  private programId: string;

  constructor(private router: Router, private route: ActivatedRoute, private exercisesService: ExercisesService,
    private cd: ChangeDetectorRef) {
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

  deleteExercise(exercise: Exercise) {
    this.exercisesService.deleteExercise(exercise, this.programId)
      .subscribe(res => {
        this.exercises.splice(this.exercises.indexOf(exercise));
      },
      error => alert(error));
  }
}
