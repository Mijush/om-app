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
  filter: boolean = false;
  filters: string[] = ['Rated', 'Genre', 'Type'];
  searchError: boolean = false;
  movies$ = new BehaviorSubject<[Movie] | null>(null);
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

    // const moviesResultByQuery =
    //   movieTitle && this.ms.movies.length > 0
    //     ? this.ms.movies.filter(
    //         (movie: Movie) =>
    //           movie &&
    //           movie.Title.toLowerCase().includes(movieTitle.toLowerCase())
    //       )
    //     : [];
    // const moviesResultByQuery =
    //   movieTitle && this.ms.movies.length > 0
    this.ms.allMovies$.pipe(take(1)).subscribe((movies) => {
      const moviesResultByQuery =
        movieTitle && movies.length > 0
          ? movies.filter(
              (movie: Movie) =>
                movie &&
                movie.Title.toLowerCase().includes(movieTitle.toLowerCase())
            )
          : [];

      if (moviesResultByQuery.length > 0)
        this.movies$.next(moviesResultByQuery as [Movie]);
    });

    // if (moviesResultByQuery.length > 0)
    //   this.movies$.next(moviesResultByQuery as [Movie]);
  }

  onFilterMoviesFormSubmit(filters: SelectedFilters) {
    const { rated, genre, type } = filters;
    this.movies$.pipe(take(1)).subscribe((movies: [Movie] | null) => {
      const filteredMovies = movies
        ? movies.filter(
            (movie: Movie) =>
              (rated ? movie.Rated === rated : true) &&
              (genre ? movie.Genre === genre : true) &&
              (type ? movie.Type === type : true)
          )
        : [];
      if (filteredMovies.length > 0) {
        this.movies$.next(filteredMovies as [Movie]);
      }

      this.noMoviesAlert = movies ? false : true;
    });
  }

  openFilterModal() {
    this.movies$.pipe(take(1)).subscribe((movies) => {
      if (movies) {
        const filterSelectorRated = [
          ...new Set(movies.map((movie) => movie.Rated)),
        ];
        const filterSelectorGenre = [
          ...new Set(movies.map((movie) => movie.Genre)),
        ];
        const filterSelectorType = [
          ...new Set(movies.map((movie) => movie.Type)),
        ];

        const dialogRef = this.dialog.open(FiltersPopoverComponent, {
          width: '500px',
          height: '500px',
          data: {
            rated: filterSelectorRated,
            genre: filterSelectorGenre,
            type: filterSelectorType,
          },
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
