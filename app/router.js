import EmberRouter from '@ember/routing/router';
import config from 'ember-task/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('movies', { path: '/' });
  this.route('add-movie');
  this.route('edit-movie', { path: '/edit-movie/:id' });
  this.route('bi-scroll',{path:'bi-scroll-demo'});
  this.route('dynamic-content',{path:'dynamic-content-sizes-demo'});
  this.route('daterange',{path:'date-range-demo'});
  this.route('multipleselect',{path:'multiple-date-select-demo'});
  this.route('groupselect',{path:'group-selection-demo'});
  this.route('selectmultiple',{path:'multiple-select-demo'});
});
