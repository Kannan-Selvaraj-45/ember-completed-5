import { module, test } from 'qunit';
import { setupTest } from 'ember-task/tests/helpers';

module('Unit | Route | add-movie', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-movie');
    assert.ok(route);
  });
});
