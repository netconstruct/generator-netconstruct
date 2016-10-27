'use strict';

const _s = require('underscore.string');
const extend = require('extend');
const path = require('path');
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
      // Service name
      {
        type: 'input',
        name: 'serviceName',
        message: 'What is the service name?',
        default: 'Example',
      },

      // Module name
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the module name?',
        default: 'Example',
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

    /** Set path properties. */
    setPaths: function setPaths() {
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
    setNames: function setNames() {
      this.props.serviceClassName = _s.classify(this.props.serviceName, true);
      this.props.serviceDashedName = _s.ltrim(_s.dasherize(this.props.serviceName), '-');
      this.props.moduleDashedName = _s.ltrim(_s.dasherize(this.props.moduleName), '-');
    },
  },

  writing: {

    /** Create service file. */
    createService: function createService() {
      const serviceFileName = `${this.props.serviceDashedName}.service.js`;
      const servicePath = path.join(
        this.jsPath,
        this.props.moduleDashedName,
        serviceFileName
      );

      this.fs.copyTpl(
        this.templatePath(this.props.es6 ? 'service.template.es6.js' : 'service.template.js'),
        this.destinationPath(servicePath),
        this.props
      );
    },
  },
});
