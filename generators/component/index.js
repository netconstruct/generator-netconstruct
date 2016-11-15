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
      // Controller name
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
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
      this.props.componentClassName = _s.classify(this.props.componentName, true);
      this.props.componentDashedName = _s.ltrim(_s.dasherize(this.props.componentName), '-');
      this.props.moduleDashedName = _s.ltrim(_s.dasherize(this.props.moduleName), '-');
    },
  },

  writing: {

    /** Create component file. */
    createController: function createController() {
      const componentControllerFileName = `${this.props.componentDashedName}.controller.js`;

      const componentControllerPath = path.join(
        this.jsPath,
        this.props.moduleDashedName,
        this.props.componentDashedName,
        componentControllerFileName
      );

      this.fs.copyTpl(
        this.templatePath(this.props.es6 ? 'component-controller.template.es6.js' : 'component-controller.template.js'),
        this.destinationPath(componentControllerPath),
        this.props
      );

      const componentViewFileName = `${this.props.componentDashedName}.view.html`;

      const componentViewPath = path.join(
        this.jsPath,
        this.props.moduleDashedName,
        this.props.componentDashedName,
        componentViewFileName
      );

      this.fs.copyTpl(
        this.templatePath('component-view.template.html'),
        this.destinationPath(componentViewPath),
        this.props
      );

      const componentFileName = 'index.js';

      const componentPath = path.join(
        this.jsPath,
        this.props.moduleDashedName,
        this.props.componentDashedName,
        componentFileName
      );

      this.fs.copyTpl(
        this.templatePath('index.template.js'),
        this.destinationPath(componentPath),
        this.props
      );
    },
  },
});
