import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MoviesController extends Controller {
  @service router;
  @service movieStore;
  @service flashMessages;
  @tracked searched = '';
  @tracked selectedMovies = [];

 options=["All","Selected"];

@tracked destination="Delete Options";

@action
chooseDestination(selectedOption) {
  this.destination = selectedOption;
  
  if (selectedOption === "Selected") {
    this.deleteSelected();
    this.destination="Delete Options";
  }
  else if(selectedOption === "All"){
    this.deleteAll();
    this.destination="Delete Options";
  }
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
  deleteMovie(id) {
    this.movieStore.deleteMovie(id);
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

  @action
  deleteSelected() {
    if (this.movieStore.movies.length === 0) {
      this.flashMessages.warning('No movies available to delete!');
      return;
    }
    if (this.selectedMovies.length === 0) {
      this.flashMessages.warning('Select movies to delete!');
      return;
    }

    this.selectedMovies.forEach((id) => {
      this.movieStore.deleteMovie(id);
    });

    this.selectedMovies = [];
  }
 
@action
editMovie(id) {
  this.router.transitionTo('edit-movie', id);
}

  @action
  navigateToAddMovie() {
    this.router.transitionTo('add-movie');
  }

  @action 
  deleteAll(){
    if(this.movieStore.movies.length>0 && this.selectedMovies.length<=0 ){
      this.movieStore.movies=[];
    }else{
      this.flashMessages.warning("No movies available to delete!");
    }
    
  }
}
