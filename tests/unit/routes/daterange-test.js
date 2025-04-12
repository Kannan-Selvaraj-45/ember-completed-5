import { module, test } from 'qunit';
import { setupTest } from 'ember-task/tests/helpers';

module('Unit | Route | daterange', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:daterange');
    assert.ok(route);
  });
});
