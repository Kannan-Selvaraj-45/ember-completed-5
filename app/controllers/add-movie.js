 
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AddMovieController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;
  @tracked newTitle = '';
  @tracked newDirector = '';
  @tracked newReleaseDate = '';

  @action
  updateTitle(event) {
    this.newTitle = event.target.value;
  }

  @action
  updateDirector(event) {
    this.newDirector = event.target.value;
  }
  
  @action
  updateReleaseDate(event) {
    this.newReleaseDate = event.target.value;
  }

  @action
  addMovie() {
    if (this.newTitle.trim() || this.newDirector.trim()) {
      this.movieStore.addMovie(this.newTitle, this.newDirector, this.newReleaseDate);

      this.newTitle = '';
      this.newDirector = '';
      this.newReleaseDate = '';

      this.router.transitionTo('movies');
    } else {
      this.flashMessages.warning('Data is Insufficient!');
    }
  }

  @action
  cancel() {
    this.router.transitionTo('movies');
  }
}