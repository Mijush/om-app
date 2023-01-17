import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieAPIService } from 'src/app/services/movieAPI.service';

@Component({
  selector: 'app-detailed-movie-view',
  templateUrl: './detailed-movie-view.component.html',
  styleUrls: ['./detailed-movie-view.component.scss'],
})
export class DetailedMovieViewComponent implements OnInit {
  constructor(private ms: MovieAPIService, private router: Router) {}
  movie: any;
  preferredGenre: string = '';
  ngOnInit() {
    this.ms.movieDetailedViewData$.subscribe((movie) => (this.movie = movie));
    this.ms.preferredGenre$.subscribe((genre) => {
      this.preferredGenre = genre;
    });
  }

  navigateToMainPage() {
    this.router.navigate(['/main']);
  }
}
