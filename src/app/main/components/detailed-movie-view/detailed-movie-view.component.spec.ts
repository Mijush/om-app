import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieViewComponent } from './detailed-movie-view.component';

describe('DetailedMovieViewPopoverComponent', () => {
  let component: DetailedMovieViewComponent;
  let fixture: ComponentFixture<DetailedMovieViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedMovieViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedMovieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
