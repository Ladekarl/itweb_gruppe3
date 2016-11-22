/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewProgramComponent } from './new-program.component';

describe('NewProgramComponent', () => {
  let component: NewProgramComponent;
  let fixture: ComponentFixture<NewProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
