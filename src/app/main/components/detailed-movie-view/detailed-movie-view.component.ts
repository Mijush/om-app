import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from 'src/app/services/movieAPI.service';

@Component({
  selector: 'app-detailed-movie-view',
  templateUrl: './detailed-movie-view.component.html',
  styleUrls: ['./detailed-movie-view.component.scss'],
})
export class DetailedMovieViewComponent implements OnInit {
  constructor(private ms: MovieAPIService) {}
  movie: any;
  prefferedGenre: string = '';
  ngOnInit() {
    this.ms.movieDetailedViewData$.subscribe((movie) => (this.movie = movie));
    this.ms.prefferedGenre$.subscribe((genre) => {
      this.prefferedGenre = genre;
    });
  }
}
