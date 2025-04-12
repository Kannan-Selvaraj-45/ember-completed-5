import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

import { inject as service } from '@ember/service';

export default class DaterangeController extends Controller {
  @service router;

  @tracked center = new Date();
  @tracked range = [];

  @action 
  goBack(){
    this.router.transitionTo("add-movie")
  }
  @action
  goToMultipleSelection(){
    this.router.transitionTo('multipleselect')
  }
  @action
  onSelect({ date }) {
    this.range = {
      start: date.start,
      end: date.end,
    };
  }
  @action
  goToDateRange() {
    this.router.transitionTo('daterange');
  }

  @task({ drop: true })
  *updateMonth({ date }) {
    yield timeout(100);
    this.center = date;
  }

  get dayCount() {
    if (!this.range.start || !this.range.end) {
      return 0;
    }

    const start = new Date(this.range.start);
    const end = new Date(this.range.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1;
  }
}
