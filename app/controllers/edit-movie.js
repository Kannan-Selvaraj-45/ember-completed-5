 import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class EditMovieController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;

  @tracked title;
  @tracked director;
  @tracked releaseDate;
  @tracked isCalendarOpen = false;
  @tracked selected;
  @tracked center;

  constructor() {
    super(...arguments);
  }
 
  setupCalendar() {
    if (this.releaseDate) {
      const [year, month, day] = this.releaseDate.split('-');
      this.selected = new Date(year, parseInt(month) - 1, day);
    } else {
      this.selected = new Date();
    }
    this.center = this.selected;
  }

  @action
  toggleCalendar() {
    if (!this.isCalendarOpen && !this.selected) {
      this.setupCalendar();
    }
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  @action
  onSelect(selected) {
    this.selected = selected.date;
    this.releaseDate = this.formatDate(this.selected);
    this.isCalendarOpen = false;
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