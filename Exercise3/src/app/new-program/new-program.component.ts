import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramsService } from '../programs/programs.service';
import { Trainingprogram } from '../trainingprogram';
import { Location } from '@angular/common';
@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.css']
})
export class NewProgramComponent implements OnInit {

  private programForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private programService: ProgramsService,private location: Location){

  }

  ngOnInit() {
    this.programForm = this.formBuilder.group ({
        name: ['',Validators.required]
    });
  }
  onSubmit(program: Trainingprogram) {
    this.programService.savePrograms(program)
      .subscribe(
        program => this.location.back(),
        error => alert(error)
      );
  }
}
