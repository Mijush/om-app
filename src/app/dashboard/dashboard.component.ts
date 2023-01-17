import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MovieAPIService } from '../services/movieAPI.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  genres: Set<string> = new Set();
  user: string = '';
  genreForm!: FormGroup;
  constructor(private router: Router, private ms: MovieAPIService) {}
  ngOnInit(): void {
    this.ms
      .getAllMovies()
      .pipe(take(1))
      .subscribe((movies: [Movie]) => {
        this.ms.allMovies$.next(movies);
        movies
          .map((movie) => movie.Genre.split(','))
          .flat()
          .forEach((genre) => this.genres.add(genre));
      });

    this.initForm();
  }

  initForm() {
    this.genreForm = new FormGroup({
      genre: new FormControl(null),
    });
  }

  prefferedGenreSubmit() {
    localStorage.setItem('user', this.user);
    this.router.navigate(['/main']);
    this.ms.prefferedGenre$.next(this.genreForm.value.genre);
  }
}
