 
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
export default class AddMovieController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;
  @tracked newTitle = '';
  @tracked newDirector = '';
  @tracked newReleaseDate = '';
  @tracked selected = new Date();
  @tracked center;
  @tracked isCalendarOpen;

  @action
  toggleCalendar(){
    this.isCalendarOpen=!this.isCalendarOpen;
  }

  @action
  onSelect(selected) {
    this.selected = selected.date;
    this.newReleaseDate=this.formatDate(this.selected);
    this.isCalendarOpen=!this.isCalendarOpen;
  }
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

   @(task(function* ({ date }) {
      yield timeout(100);
      this.center = date;
    }).drop())
    updateMonth;


  @action
  updateTitle(event) {
    this.newTitle = event.target.value;
  }

  @action
  updateDirector(event) {
    this.newDirector = event.target.value;
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