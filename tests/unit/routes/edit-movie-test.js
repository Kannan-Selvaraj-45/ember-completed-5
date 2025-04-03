import { module, test } from 'qunit';
import { setupTest } from 'ember-task/tests/helpers';

module('Unit | Route | edit-movie', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:edit-movie');
    assert.ok(route);
  });
});
