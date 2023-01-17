import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMovies',
})
export class FilterMoviesPipe implements PipeTransform {
  transform(movies: any, filteredMovies: any) {
    if (filteredMovies.length > 0) {
      movies = filteredMovies;
      return movies;
    } else {
      return movies;
    }
  }
}
