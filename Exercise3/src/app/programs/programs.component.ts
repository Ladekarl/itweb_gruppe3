import {Component, OnInit} from '@angular/core';
import {Trainingprogram} from '../trainingprogram';
import {ProgramsService} from './programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  private trainingPrograms: Trainingprogram[];

  constructor(private programsService: ProgramsService) {
  }

  ngOnInit() {
    this.programsService.getPrograms()
      .subscribe(
        programs => this.trainingPrograms = programs,
        error => alert(error));
  }

}
