import {Component, OnInit} from '@angular/core';
import {Trainingprogram} from '../trainingprogram';
import {ProgramsService} from './programs.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  private trainingPrograms: Trainingprogram[];

  constructor(private programsService: ProgramsService, private router: Router) {
  }

  ngOnInit() {
    this.programsService.getPrograms()
      .subscribe(
        programs => this.trainingPrograms = programs,
        error => alert(error));
  }

  programClicked(program: Trainingprogram) {
    this.router.navigate(['/exercises'], {queryParams: {id: program._id}});
  }

}
