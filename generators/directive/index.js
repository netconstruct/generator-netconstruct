'use strict';

var _s = require('underscore.string');
var extend = require('extend');
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  /** Generator constructor. */
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  /** Initialise generator. */
  initializing: function () {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  },

  /** Set generator prompts. */
  prompting: function () {
    var done = this.async();

    if (this.props) {
      this.log('Using saved configuration.');
    }

    var prompts = [
      // Directive name
      {
        type: 'input',
        name: 'directivePrefix',
        message: 'What is the directive prefix?',
        default: 'netc'
      },

      // Directive name
      {
        type: 'input',
        name: 'directiveName',
        message: 'What is the directive name?',
        default: 'Example'
      },

      // Module name
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the module name?',
        default: 'Example'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = extend({}, this.props, props);

      done();
    }.bind(this));
  },

  configuring: {

    /** Save user configuration. */
    saveConfig: function () {
      this.config.set({
        props: this.props
      });
    },

    /** Set path properties. */
    setPaths: function () {
      // Set root path.
      this.root = this.destinationRoot();

      if (this.props.destinationRoot && this.props.destinationRoot.length) {

        if (this.root.substring(this.root.length - 1) === '/') {
          this.props.destinationRoot = this.props.destinationRoot.substring(0, this.root.length - 2);
        }

        this.root = this.destinationPath(this.props.destinationRoot);
      }

      // Set useful paths.
      this.srcPath = path.join(this.root, 'SiteFiles/src');
      this.fontsPath = path.join(this.root, 'SiteFiles/src/ui/fonts');
      this.imgPath = path.join(this.root, 'SiteFiles/src/ui/img');
      this.jsPath = path.join(this.root, 'SiteFiles/src/ui/js');
      this.sassPath = path.join(this.root, 'SiteFiles/src/ui/sass');
      this.tasksPath = path.join(this.root, 'SiteFiles/src/tasks');
    },

    /** Set name properties. */
    setNames: function () {
      this.props.directivePrefix = _s.camelize(this.props.directivePrefix, true);
      this.props.directiveClassName = _s.classify(this.props.directiveName, true);
      this.props.directiveDashedName = _s.ltrim(_s.dasherize(this.props.directiveName), '-');
      this.props.moduleDashedName = _s.ltrim(_s.dasherize(this.props.moduleName), '-');
    }
  },

  writing: {

    /** Create directive file. */
    createDirective: function () {

      var directiveFileName = this.props.directiveDashedName + '.directive.js';
      var directivePath = path.join(this.jsPath, this.props.moduleDashedName, this.props.directiveDashedName, directiveFileName);

      this.fs.copyTpl(
        this.templatePath(this.props.es6 ? 'directive.template.es6.js' : 'directive.template.js'),
        this.destinationPath(directivePath),
        this.props
      );
    }
  }
});
