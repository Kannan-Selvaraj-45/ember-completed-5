import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BiScrollController extends Controller {
  @service movieStore;
  @service router;
  @tracked items = [];

  @tracked upwardCounter = 0;
  @tracked downwardCounter = 0;

  constructor() {
    super(...arguments);
    this.items = this.movieStore.movies.map((item) => ({
      title: item.title,
      director: item.director,
      watchedOn: item.releaseDate,
    }));
    console.log(this.items.title);
  }

  @action
  loadAbove() {
    this.upwardCounter++;
    const newItems = this.movieStore.movies.map((item) => ({
      title: item.title,
      director: item.director,
      watchedOn: item.releaseDate,
    }));

    this.items = [...newItems, ...this.items];
  }

  @action
  loadBelow() {
    this.downwardCounter++;
    const newItems = this.movieStore.movies.map((item) => ({
      title: item.title,
      director: item.director,
      watchedOn: item.releaseDate,
    }));

    this.items = [...this.items, ...newItems];
  }

  @action 
  scrollDynamic(){
    this.router.transitionTo('dynamic-content');
  }

  @action
  goBack(){
    this.router.transitionTo("add-movie")
  }
}
