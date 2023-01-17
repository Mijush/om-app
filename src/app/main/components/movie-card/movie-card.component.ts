import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movieCardData: any;
  @Input() poster: any;
  constructor() {}

  ngOnInit(): void {
    this.poster = this.movieCardData.Poster;
  }
}
