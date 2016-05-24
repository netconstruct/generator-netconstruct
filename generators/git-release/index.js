'use strict';

var extend = require('extend');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  /** Generator constructor. */
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  /** Initialise generator. */
  initializing: function() {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  },

  /** Set generator prompts. */
  prompting: function() {
    var done = this.async();

    if (this.props) {
      this.log('Using saved configuration.');
    }

    var prompts = [
      // Release name
      {
        type: 'input',
        name: 'releaseName',
        message: 'What is the release name?',
        default: 'example-release'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = extend({}, this.props, props);

      done();
    }.bind(this));
  },

  configuring: {

    /** Save user configuration. */
    saveConfig: function() {
      this.config.set({
        props: this.props
      });
    },
  },

  writing: {
    /** Create default branches. */
    createDefaultBranches: function() {
      var branchName = 'release/' + this.props.releaseName;

      // Create and push preview branch.
      this.spawnCommandSync('git', ['checkout', '-b', branchName, 'master']);
    }
  }
});
