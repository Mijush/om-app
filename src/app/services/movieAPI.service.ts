import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie.interface';
import { SelectedFilters } from '../interfaces/selectedFilters.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {
  movies: [Movie] | [] = [];
  allMovies$ = new BehaviorSubject<[Movie] | []>([]);
  movieDetailedViewData$ = new BehaviorSubject<Movie | {}>({});
  genres$ = new BehaviorSubject<string[]>([]);
  preferredGenre$ = new BehaviorSubject<string>('');
  constructor(private _http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this._http.get<any>(`${environment.apiEndpoint}/movies`);
  }

  getMoviesResultsByQuery(movieTitle: string, movies: [Movie] | []) {
    return movieTitle && movies.length > 0
      ? movies.filter(
          (movie: Movie) =>
            movie &&
            movie.Title.toLowerCase().includes(movieTitle.toLowerCase())
        )
      : [];
  }

  getFilteredMovies(movies: [Movie] | null, filters: SelectedFilters) {
    const { rated, genre, type } = filters;
    return movies
      ? movies.filter(
          (movie: Movie) =>
            (rated ? movie.Rated === rated : true) &&
            (genre ? movie.Genre === genre : true) &&
            (type ? movie.Type === type : true)
        )
      : [];
  }

  getFilterSelectors(movies: [Movie], filters: (keyof Movie)[]) {
    const createFilterSelectors = (movies: Movie[], filter: keyof Movie) => {
      return [...new Set(movies.map((movie: Movie) => movie[filter]))];
    };

    const combineFilterSelectors = (
      movies: Movie[],
      filters: (keyof Movie)[]
    ) => {
      let result: any = {};
      filters.forEach((filter: keyof Movie) => {
        result[filter.toLowerCase()] = createFilterSelectors(movies, filter);
      });
      return result;
    };

    return combineFilterSelectors(movies, filters);
  }
}
