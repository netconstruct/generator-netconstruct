'use strict';

const extend = require('extend');
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

    const prompts = [
      // Release name
      {
        type: 'input',
        name: 'releaseName',
        message: 'What is the release name?',
        default: 'example-release',
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = extend({}, this.props, props);
    });
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
      const branchName = `release/${this.props.releaseName}`;

      // Create and push preview branch.
      this.spawnCommandSync('git', ['checkout', '-b', branchName, 'master']);
    },
  },
});
