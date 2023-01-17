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
  genres: string[] = [];
  user: string = '';
  genreForm!: FormGroup;
  constructor(private router: Router, private ms: MovieAPIService) {}
  ngOnInit(): void {
    this.ms;
    this.ms.genres$.subscribe((genres) => (this.genres = genres));
    this.initForm();
  }

  initForm() {
    this.genreForm = new FormGroup({
      genre: new FormControl(null),
    });
  }

  preferredGenreSubmit() {
    localStorage.setItem('user', this.user);
    this.router.navigate(['/main']);
    this.ms.preferredGenre$.next(this.genreForm.value.genre);
  }
}
