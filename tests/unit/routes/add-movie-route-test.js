import { module, test } from 'qunit';
import { setupTest } from 'ember-task/tests/helpers';

module('Unit | Route | addMovieRoute', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-movie-route');
    assert.ok(route);
  });
});
