import Controller from '@ember/controller';
// import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object'
import {inject as service} from '@ember/service'

export default class GoupselectController extends Controller {
  // @tracked number=null;
  @service router;
  groupedNumbers = [
    { groupName: 'Smalls', options: ['one', 'two', 'three'] },
    { groupName: 'Mediums', options: ['four', 'five', 'six'] },
    {
      groupName: 'Bigs',
      options: [
        { groupName: 'Fairly big', options: ['seven', 'eight', 'nine'] },
        { groupName: 'Really big', options: ['ten', 'eleven', 'twelve'] },
      ],
    },
    'one hundred',
    'one thousand',
  ];

  @action
  goToSelectMultiple(){
    this.router.transitionTo('selectmultiple')
  }

  @action
  goBack(){
    this.router.transitionTo('add-movie')
  }

  //   @action
  //   selectNumber(selected){
  //     this.number=selected
  //   }
}
