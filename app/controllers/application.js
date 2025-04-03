import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {

  
  @service flashMessages;

  @action
  removeFlashMessage(flash) {
    this.flashMessages.queue = this.flashMessages.queue.filter(
      (msg) => msg !== flash,
    );
  }
}
