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
  @tracked showText = true;
  @tracked showAddColumnModal;
  @tracked newColumnTitle='';
  @tracked destination = 'Customize Table';
  options = ['Add column','Add row','Delete all', 'Delete selected'];

  @action
  focusInput(element) {
    element.focus();
  }

  @action
  chooseDestination(selectedOption) {
    this.destination = selectedOption;

    if (selectedOption === 'Delete selected') {
      this.deleteSelected.perform();
    } else if (selectedOption === 'Delete all') {
      this.deleteAll.perform();
    }else if (selectedOption === 'Add column') {
      this.showAddColumnModal = true;
    }
  }

  @action
  handleTitle(event){
    this.newColumnTitle=event.target.value;
  }

  @action
  addNewColumn(){
    this.movieStore.addColumn(this.newColumnTitle);
    this.showAddColumnModal = false;
    this.destination="Customize Table";
    this.flashMessages.success(`Column "${this.newColumnTitle}" added successfully!`);
  }

  @action
  closeAddColumnModal() {
    this.showAddColumnModal = false;
    this.newColumnTitle='';
    this.destination = 'Customize Table';
  }

  get tableHeaders(){
    return this.movieStore.headers;
  }

  get filteredMovies() {
    if (!this.searched.trim()) {
      return this.movieStore.movies;
    }
    return this.movieStore.movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(this.searched.toLowerCase()) ||
        movie.director.toLowerCase().includes(this.searched.toLowerCase()),
    );
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

  @task({ keepLatest: true })
  *deleteMovie(id) {
    yield timeout(100);
    this.movieStore.deleteMovie(id);
    this.flashMessages.danger(`Movie having id ${id} deleted!`);
  }

  @task({ drop: true })
  *deleteSelected() {
    if (this.movieStore.movies.length === 0) {
      this.flashMessages.warning('No movies available to delete!');
      this.destination = 'Customize Table';
      return;
    }
    if (this.selectedMovies.length === 0) {
      this.flashMessages.warning('Select movies to delete!');
      this.destination = 'Customize Table';
      return;
    }
    if (this.deleteSelected.isRunning) {
      this.flashMessages.warning('Deleting!');
    }

    yield timeout(2000);
    this.selectedMovies.forEach((id) => {
      this.movieStore.deleteMovie(id);
    });
    this.selectedMovies = [];
    this.destination = 'Customize Table';
    this.flashMessages.danger('Movies deleted!');
  }

  @task({ drop: true })
  *deleteAll() {
    if (this.deleteAll.isRunning && this.movieStore.movies.length > 0) {
      this.flashMessages.warning('Deleting!');
    }

    if (this.movieStore.movies.length > 0) {
      const moviesToDelete = [...this.movieStore.movies];

      yield timeout(3000);
      moviesToDelete.forEach((movie) => {
        this.movieStore.deleteMovie(movie.id);
      });
      this.flashMessages.danger('Movies deleted!');
    } else {
      this.flashMessages.warning('No movies available to delete!');
    }

    this.destination = 'Customize Table';
  }

  @action
  undoAll() {
    this.deleteAll.cancelAll();
    this.deleteSelected.cancelAll();
    this.destination = 'Customize Table';
  }

  @action
  editMovie(id) {
    this.router.transitionTo('edit-movie', id);
  }

  @action
  navigateToAddMovie() {
    this.router.transitionTo('add-movie');
  }
}
