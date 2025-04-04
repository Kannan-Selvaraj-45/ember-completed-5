import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditMovieRoute extends Route {
  @service movieStore;
  @service flashMessages;
  @service router;

  model(params) {
    const movie = this.movieStore.movies.find(
      (m) => m.id === parseInt(params.id)
    );
    if (!movie) {
      this.flashMessages.danger('Movie not found');
      this.router.transitionTo('movies');
    }
    return movie;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.title = model.title;
    controller.director = model.director;
    controller.releaseDate = model.releaseDate;
    controller.setupCalendar();
  }
}