'use strict';

const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({

  /** Generator constructor. */
  constructor: function constructor() {
    yeoman.Base.apply(this, arguments); // eslint-disable-line
  },

  /** Initialise generator. */
  initializing: function initializing() {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  },

  /** Set generator prompts. */
  prompting: function prompting() {
    if (this.props) {
      this.log('Using saved configuration.');
    }
  },

  configuring: {

    /** Save user configuration. */
    saveConfig: function saveConfig() {
      this.config.set({
        props: this.props,
      });
    },
  },

  writing: {
    /** Create default branches. */
    createDefaultBranches: function createDefaultBranches() {
      // Create and push preview branch.
      this.spawnCommandSync('git', ['checkout', '-b', 'release/preview', 'master']);
      this.spawnCommandSync('git', ['push', 'origin', 'release/preview']);

      // Change to master branch.
      this.spawnCommandSync('git', ['checkout', 'master']);
    },
  },
});
