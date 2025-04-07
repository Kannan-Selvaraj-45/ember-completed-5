 
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MovieStoreService extends Service {
  @service flashMessages;
  @tracked movies = [
    { id: 1, title: 'Interstellar ', director: 'Nolan', releaseDate: '2014-11-07' },
    { id: 2, title: 'Avengers ', director: 'Joss Whedon', releaseDate: '2012-05-04' },
    { id: 3, title: 'Inception ', director: 'Christopher Nolan', releaseDate: '2010-07-16' },
    { id: 4, title: '', director: 'Christopher Nolan', releaseDate: '' },
    { id: 5, title: 'Dune', director: '', releaseDate: '2021-10-22' },
  
  ];
  

  @action
  addMovie(title, director, releaseDate) {
    let newId = this.movies.length
      ? this.movies[this.movies.length - 1].id + 1
      : 1;

    this.movies = [...this.movies, { id: newId, title, director, releaseDate }];

    // console.log('Movie added:', { id: newId, title, director, releaseDate });
    // console.log('Current movies:', this.movies);
    this.flashMessages.success('New movie added Successfully!');
    return true;
  }

  @action
  deleteMovie(id) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
     
  }

  @action
  updateMovie(id, title, director, releaseDate) {
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, title, director, releaseDate } : movie,
    );
    this.flashMessages.info('Movie updated Successfully!');
  }
}