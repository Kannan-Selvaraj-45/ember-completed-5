import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { format } from 'date-fns';
import {inject as service} from '@ember/service';
import {task,timeout} from 'ember-concurrency'

export default class MultipleSelectController extends Controller {

  @service router
  
  @tracked center = new Date();
  @tracked collection = [];

  @action
  onSelect(selected) {
    this.collection = selected.date;
  }

  @action 
  goBack(){
    this.router.transitionTo("daterange")
  }

  @task({drop:true})
  *updateMonth({date}){
    yield timeout(100);
    this.center=date
  }
  
  @action
  removeDate(dateString) {
    const dateToRemove = this.collection.find(date => 
      format(date, 'MMMM d, yyyy') === dateString
    );
    
    if (dateToRemove) {
      this.collection = this.collection.filter(date => date !== dateToRemove);
    }
  }
  
  @action
  clearDates() {
    this.collection = [];
  }
  
  get selectedDatesCount() {
    return this.collection.length;
  }
  
  get hasSelectedDates() {
    return this.selectedDatesCount > 0;
  }
  
  get formattedSelectedDates() {
    const sortedDates = [...this.collection].sort((a, b) => a - b);
    return sortedDates.map(date => format(date, 'MMMM d, yyyy'));
  }
}