import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandtrackerComponent } from './handtracker.component';

describe('HandtrackerComponent', () => {
  let component: HandtrackerComponent;
  let fixture: ComponentFixture<HandtrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandtrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandtrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
