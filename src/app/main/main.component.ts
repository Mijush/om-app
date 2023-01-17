import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieAPIService } from '../services/movieAPI.service';
import { MatDialog } from '@angular/material/dialog';
import { FiltersPopoverComponent } from './components/filters-popover/filters-popover.component';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from '../interfaces/movie.interface';
import { SelectedFilters } from '../interfaces/selectedFilters.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: string | null = '';
  movieSearchForm!: FormGroup;
  movieFilterForm!: FormGroup;
  searchError: boolean = false;
  movies$ = new BehaviorSubject<[Movie] | null>(null);
  filters: (keyof Movie)[] = ['Rated', 'Genre', 'Type'];
  @Input() noMoviesAlert: boolean = false;
  constructor(
    private ms: MovieAPIService,
    @Inject(MatDialog) public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.initForm();
  }
  initForm() {
    this.movieSearchForm = new FormGroup({
      movieTitle: new FormControl(null),
    });
  }

  onMovieSearchFormSubmit() {
    const movieTitle = this.movieSearchForm.value.movieTitle;
    this.searchError = movieTitle ? false : true;
    this.ms.allMovies$.pipe(take(1)).subscribe((movies) => {
      const moviesResultsByQuery = this.ms.getMoviesResultsByQuery(
        movieTitle,
        movies
      );
      if (moviesResultsByQuery.length > 0)
        this.movies$.next(moviesResultsByQuery as [Movie]);
    });
  }

  onFilterMoviesFormSubmit(filters: SelectedFilters) {
    if (!filters) return;
    this.movies$.pipe(take(1)).subscribe((movies: [Movie] | null) => {
      const filteredMovies = this.ms.getFilteredMovies(movies, filters);
      if (filteredMovies.length > 0) {
        this.movies$.next(filteredMovies as [Movie]);
      }

      this.noMoviesAlert = movies ? false : true;
    });
  }

  openFilterModal() {
    this.movies$.pipe(take(1)).subscribe((movies) => {
      if (movies) {
        const filterSelectors = this.ms.getFilterSelectors(
          movies,
          this.filters
        );

        const dialogRef = this.dialog.open(FiltersPopoverComponent, {
          data: filterSelectors,
        });

        dialogRef.afterClosed().subscribe((filters) => {
          this.onFilterMoviesFormSubmit(filters);
        });
      }
    });
  }

  openMovieDetailedView(movie: Movie) {
    this.ms.movieDetailedViewData$.next(movie);
    this.router.navigate(['/movie-page']);
  }
}
