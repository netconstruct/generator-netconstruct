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
      // Factory name
      {
        type: 'input',
        name: 'factoryName',
        message: 'What is the factory name?',
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
      this.props.factoryCamelCaseName = _s.camelize(this.props.factoryName, true);
      this.props.factoryDashedName = _s.ltrim(_s.dasherize(this.props.factoryName), '-');
      this.props.moduleDashedName = _s.ltrim(_s.dasherize(this.props.moduleName), '-');
    },
  },

  writing: {

    /** Create factory file. */
    createFactory: function createFactory() {
      const factoryFileName = `${this.props.factoryDashedName}.factory.js`;
      const factoryPath = path.join(
        this.jsPath,
        this.props.moduleDashedName,
        this.props.factoryDashedName,
        factoryFileName
      );

      this.fs.copyTpl(
        this.templatePath(this.props.es6 ? 'factory.template.es6.js' : 'factory.template.js'),
        this.destinationPath(factoryPath),
        this.props
      );
    },
  },
});
