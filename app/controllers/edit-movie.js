 
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class EditMovieController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;

  @tracked title;
  @tracked director;
  @tracked releaseDate;

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateDirector(event) {
    this.director = event.target.value;
  }
  
  @action
  updateReleaseDate(event) {
    this.releaseDate = event.target.value;
  }

  @action
  saveChanges() {
    if (!this.title?.trim() && !this.director?.trim()) {
      this.flashMessages.danger('Data Insufficient!');
      return;
    }
    this.movieStore.updateMovie(
      this.model.id,
      this.title.trim(),
      this.director.trim(),
      this.releaseDate
    );
    this.router.transitionTo('movies');
  }

  @action
  cancel() {
    this.router.transitionTo('movies');
  }
}