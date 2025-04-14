import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object'
import {inject as service} from '@ember/service'

export default class SelectmultipleController extends Controller {

  @service router;

  @action 
  goBack(){
    this.router.transitionTo('groupselect')
  }
  @tracked name = [];
  
  names = ['Stefan', 'Miguel', 'Tomster', 'Pluto'];


  
  get selectedCount() {
    return this.name.length;
  }
  
  get hasSelections() {
    return this.selectedCount > 0;
  }
}