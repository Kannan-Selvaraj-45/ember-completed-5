import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-task/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | number-slide', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DynamicContent />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <DynamicContent>
        template block text
      </DynamicContent>
    `);

    assert.dom().hasText('template block text');
  });
});
