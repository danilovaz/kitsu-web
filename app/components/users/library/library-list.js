import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { gt } from 'ember-computed';

export default Component.extend({
  tagName: '',
  hasSelectedMedia: gt('selectedLibraryEntries.length', 0),

  init() {
    this._super(...arguments);
    set(this, 'selectedLibraryEntries', []);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'media') !== get(this, 'mediaWas')) {
      set(this, 'selectedLibraryEntries', []);
    }
    set(this, 'mediaWas', get(this, 'media'));
  },

  actions: {
    checkedEntry(libraryEntry, value) {
      const list = get(this, 'selectedLibraryEntries');
      if (value) {
        list.addObject(libraryEntry);
      } else {
        list.removeObject(libraryEntry);
      }
    },

    selectAll() {
      const entries = get(this, 'libraryEntries');
      get(this, 'selectedLibraryEntries').addObjects(entries);
    },

    resetSelection() {
      set(this, 'selectedLibraryEntries', []);
    }
  }
});
