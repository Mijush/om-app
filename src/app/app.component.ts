import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Movie } from './interfaces/movie.interface';
import { MovieAPIService } from './services/movieAPI.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private ms: MovieAPIService) {}

  ngOnInit(): void {
    this.ms
      .getAllMovies()
      .pipe(take(1))
      .subscribe((movies: [Movie]) => {
        this.ms.allMovies$.next(movies);
        const genres: string[] = [];
        movies
          .map((movie: Movie) => movie.Genre.split(','))
          .flat()
          .forEach((genre) => genres.push(genre));
        this.ms.genres$.next(genres);
      });
  }
}
