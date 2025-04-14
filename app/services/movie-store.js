import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import {task,timeout} from 'ember-concurrency'

export default class MovieStoreService extends Service {
  @service flashMessages;
  @tracked movies = [
    {
      id: 1,
      title: 'Interstellar',
      director: 'Christopher Nolan',
      releaseDate: '2014-11-07',
    },
    {
      id: 2,
      title: 'Avengers',
      director: 'Joss Whedon',
      releaseDate: '2012-05-04',
    },
    {
      id: 3,
      title: 'Inception',
      director: 'Christopher Nolan',
      releaseDate: '2010-07-16',
    },
    { id: 4, title: '', director: 'Robert Zemeckis', releaseDate: '' },
    { id: 5, title: 'Dune', director: '', releaseDate: '2021-10-22' },
    {
      id: 6,
      title: 'The Matrix',
      director: 'Wachowskis',
      releaseDate: '1999-03-31',
    },
    {
      id: 7,
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      releaseDate: '2008-07-18',
    },
    {
      id: 8,
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      releaseDate: '1994-10-14',
    },
    {
      id: 9,
      title: 'Fight Club',
      director: 'David Fincher',
      releaseDate: '1999-10-15',
    },
    {
      id: 10,
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      releaseDate: '1994-07-06',
    },
    {
      id: 11,
      title: 'Her',
      director: 'Spike Jonze',
      releaseDate: '2013-12-18',
    },
    {
      id: 12,
      title: 'Joker',
      director: 'Todd Phillips',
      releaseDate: '2019-10-04',
    },
    {
      id: 13,
      title: 'Gravity',
      director: 'Alfonso Cuarón',
      releaseDate: '2013-10-04',
    },
    {
      id: 14,
      title: 'Memento',
      director: 'Nolan',
      releaseDate: '2000-10-11',
    },
    {
      id: 15,
      title: 'Skyfall',
      director: 'Sam Mendes',
      releaseDate: '2012-11-09',
    },
    {
      id: 16,
      title: 'Amélie',
      director: 'Jean-Pierre Jeunet',
      releaseDate: '2001-04-25',
    },
    {
      id: 17,
      title: 'Arrival',
      director: 'Denis Villeneuve',
      releaseDate: '2016-11-11',
    },
    {
      id: 18,
      title: 'Oldboy',
      director: 'Park Chan-wook',
      releaseDate: '2003-11-21',
    },
    {
      id: 19,
      title: 'Drive',
      director: 'Nicolas W. Refn',
      releaseDate: '2011-09-16',
    },
    {
      id: 20,
      title: 'Moonlight',
      director: 'Barry Jenkins',
      releaseDate: '2016-10-21',
    },
  ];

  @task({drop:true})
  *addMovie(title, director, releaseDate) {
    let newId = this.movies.length
      ? this.movies[this.movies.length - 1].id + 1
      : 1;

    this.movies = [...this.movies, { id: newId, title, director, releaseDate }];

    // console.log('Movie added:', { id: newId, title, director, releaseDate });
    // console.log('Current movies:', this.movies);
    yield timeout(500)
    this.flashMessages.success('New movie added Successfully!');
     
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
