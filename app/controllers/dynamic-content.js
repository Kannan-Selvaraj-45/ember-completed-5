
import Controller from "@ember/controller"
import { action } from '@ember/object';
 
import { inject as service } from '@ember/service';

export default class DynamicContentController extends Controller{
    @service router;
    
    @action
    goHome(){
        this.router.transitionTo("movies")
    }

    @action
    goBack(){
        this.router.transitionTo("bi-scroll")
    }
}