import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieAPIService {
  movies: [Movie] | [] = [];
  allMovies$ = new BehaviorSubject<[Movie] | []>([]);
  movieDetailedViewData$ = new BehaviorSubject<Movie | {}>({});
  prefferedGenre$ = new BehaviorSubject<string>('');
  constructor(private _http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this._http.get<any>(`${environment.apiEndpoint}/movies`);
  }
}
