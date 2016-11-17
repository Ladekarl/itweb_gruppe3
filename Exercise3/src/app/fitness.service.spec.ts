/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FitnessService } from './fitness.service';

describe('FitnessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitnessService]
    });
  });

  it('should ...', inject([FitnessService], (service: FitnessService) => {
    expect(service).toBeTruthy();
  }));
});
