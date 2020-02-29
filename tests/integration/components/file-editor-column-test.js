import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file editor column', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls addColumn when the add column glyph is clicked', async function(assert) {
    assert.expect(1);
    this.setProperties({
      addColumn: () => {
        assert.ok(true, 'addColumn action was called');
      },
      noop: () => {}
    })

    await render(hbs`
      {{file-editor-column col='2' numColumns=2
        addColumn=this.addColumn
        focusEditor=this.noop
        selectFile=this.noop
        contentChanged=this.noop
        removeColumn=this.noop
        showFileTree=this.noop
        hideFileTree=this.noop
      }}
    `);

    await click('.glyphicon-plus');
  });

  test('it calls removeColumn when the remove column glyph is clicked', async function(assert) {
    assert.expect(1);

    this.set('externalAction', () => {
      assert.ok(true, 'removeColumn action was called');
    });

    await render(hbs`
      {{file-editor-column col='2' removeColumn=(action externalAction)}}
    `);

    this.$('.glyphicon-remove').click();
  });

  test('it calls showFileTree when the show file tree glyph is clicked', async function(assert) {
    assert.expect(1);

    this.set('externalAction', () => {
      assert.ok(true, 'showFileTree action was called');
    });

    await render(hbs`
      {{file-editor-column col='1' fileTreeShown=false showFileTree=(action externalAction)}}
    `);

    this.$('.glyphicon-chevron-right').click();
  });

  test('it calls contentChanged with true when changing the content via the code editor', async function(assert) {
    assert.expect(1);

    this.set('externalAction', (isUserChange) => {
      assert.ok(isUserChange, 'contentChanged was called with isUserChange = true');
    });

    this.set('ignoreAction', function() {});

    this.set('file', { content: '' });

    await render(hbs`
      {{file-editor-column col='1' file=file contentChanged=(action externalAction) focusEditor=(action ignoreAction)}}
    `);

    let textboxNode = '.CodeMirror textarea';
    await fillIn(textboxNode, 'a');
  });

  test('it calls contentChanged with false when changing the content programatically', async function(assert) {
    assert.expect(1);

    this.set('externalAction', (isUserChange) => {
      assert.notOk(isUserChange, 'contentChanged was called with isUserChange = false');
    });

    this.set('file', { content: '' });

    await render(hbs`
      {{file-editor-column col='1' file=file contentChanged=(action externalAction)}}
    `);

    this.set('file.content', 'new content');
  });
});
