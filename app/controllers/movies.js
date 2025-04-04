import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class MoviesController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;
  
  @tracked searched = '';
  @tracked selectedMovies = [];
  @tracked destination = "Delete Options";
  
  options = ["All", "Selected"];

  @action
  chooseDestination(selectedOption) {
    this.destination = selectedOption;
    
    if (selectedOption === "Selected") {
      this.deleteSelected.perform();
    }
    else if (selectedOption === "All") {
      this.deleteAll.perform();
    }
  }

  get filteredMovies() {
    if (!this.searched.trim()) {
      return this.movieStore.movies;
    }
    return this.movieStore.movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(this.searched.toLowerCase()) ||
        movie.director.toLowerCase().includes(this.searched.toLowerCase())
    );
  }

  @task({ drop: true })
  *deleteMovie(id) {
    yield timeout(100);
    this.movieStore.deleteMovie(id);
  }

  @action
  updateSearch(event) {
    this.searched = event.target.value;
  }

  @action
  toggleSelect(movieId, event) {
    if (event.target.checked) {
      this.selectedMovies = [...this.selectedMovies, movieId];
    } else {
      this.selectedMovies = this.selectedMovies.filter((id) => id !== movieId);
    }
  }

  @task({ drop: true })
  *deleteSelected() {
    if (this.movieStore.movies.length === 0) {
      this.flashMessages.warning('No movies available to delete!');
      return;
    }
    if (this.selectedMovies.length === 0) {
      this.flashMessages.warning('Select movies to delete!');
      return;
    }
    if(this.deleteSelected.isRunning){
      this.flashMessages.warning("Deleting!");
    }
    yield timeout(1000);
    this.selectedMovies.forEach((id) => {
      this.movieStore.deleteMovie(id);
    });
    this.selectedMovies = [];
    this.destination = "Delete Options";
  }

  @action
  editMovie(id) {
    this.router.transitionTo('edit-movie', id);
  }

  @action
  navigateToAddMovie() {
    this.router.transitionTo('add-movie');
  }

  @task({ drop: true })
  *deleteAll() {
    if(this.deleteAll.isRunning &&this.movieStore.movies.length>0){
      this.flashMessages.warning("Deleting!");
    }

    if (this.movieStore.movies.length > 0) {
      const moviesToDelete = [...this.movieStore.movies];

      yield timeout(1000);
      moviesToDelete.forEach(movie => {
        this.movieStore.deleteMovie(movie.id);
      });
    } else {
      this.flashMessages.warning("No movies available to delete!");
    }
    this.destination = "Delete Options";
  }
}