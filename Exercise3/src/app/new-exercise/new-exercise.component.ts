import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '../exercise';
import { ExercisesService } from '../exercises/exercises.service';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {
  private exerciseForm: FormGroup;
  private programId: string;

  constructor(private formBuilder: FormBuilder, private exercisesService: ExercisesService,
    private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((data: { id: string }) => {
        this.programId = data.id;
      });

    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      setCount: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit(model: Exercise) {
    this.exercisesService.saveExercise(model, this.programId)
      .subscribe(
        exercise => this.location.back(),
        error => alert(error));
  }
}
