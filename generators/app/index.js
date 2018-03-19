/* eslint-disable max-len, prefer-template */

'use strict';

const _s = require('underscore.string');
const mkdirp = require('mkdirp');
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
      return Promise.resolve();
    }

    const prompts = [
      // Application name?
      {
        type: 'input',
        name: 'appname',
        message: 'What is the application name?',
        default: 'Example',
      },

      // Root path?
      {
        type: 'input',
        name: 'destinationRoot',
        message: 'What is the web project root path?',
        default: 'CMS',
      },

      // Create folder structure?
      {
        type: 'confirm',
        name: 'createFolderStructure',
        message: 'Would you like to create the standard folder structure?',
        default: true,
      },

      // Visual Studio version?
      {
        type: 'input',
        name: 'msvs',
        message: 'Which Visual Studio version is installed?',
        default: '2017',
      },

      // ES6?
      {
        type: 'confirm',
        name: 'es6',
        message: 'Would you like to use ES6?',
        default: true,
      },

      // NPM Packages?
      {
        type: 'confirm',
        name: 'installPackages',
        message: 'Would you like to install packages?',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;

      // Set app name.
      this.props.appname = this.props.appname || this.appname;
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
      this.corePath = path.join(this.root, 'SiteFiles/src/core');
      this.fontsPath = path.join(this.root, 'SiteFiles/src/fonts');
      this.imgPath = path.join(this.root, 'SiteFiles/src/img');
      this.jsPath = path.join(this.root, 'SiteFiles/src/js');
      this.sassPath = path.join(this.root, 'SiteFiles/src/sass');
      this.styleguidePath = path.join(this.root, 'SiteFiles/src/styleguide');
      this.tasksPath = path.join(this.root, 'SiteFiles/src/tasks');
      this.offlinePath = path.join(this.root, 'SiteFiles/src/offline.ejs');
      this.postcssConfigPath = path.join(this.root, 'SiteFiles/src/postcss.config.js');
      this.wppTargetsPath = path.join(this.root, this.props.appname + '.Web.wpp.targets');
    },

    /** Set app name properties. */
    setAppName: function setPaths() {
      this.props.appnameSlug = _s.slugify(this.props.appname);
    },
  },

  writing: {

    /** Create folder structure. */
    createFolderStructure: function createFolderStructure() {
      if (this.props.createFolderStructure) {
        mkdirp(this.fontsPath);
        mkdirp(this.imgPath);
        mkdirp(this.jsPath);
        mkdirp(this.sassPath);
        mkdirp(this.styleguidePath);
        mkdirp(this.tasksPath);
      }
    },

    /** Create git files. */
    git: function git() {
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('_gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },

    /** Create babelrc file. */
    babelrc: function babelrc() {
      this.fs.copy(
        this.templatePath('_babelrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.babelrc'))
      );
    },

    /** Create editorconfig file. */
    editorconfig: function editorconfig() {
      this.fs.copy(
        this.templatePath('_editorconfig'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.editorconfig'))
      );
    },

    /** Create eslintignore file. */
    eslintignore: function eslintignore() {
      this.fs.copy(
        this.templatePath('_eslintignore'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintignore'))
      );
    },

    /** Create eslintrc file. */
    eslintrc: function eslintrc() {
      this.fs.copy(
        this.templatePath('_eslintrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintrc'))
      );
    },

    /** Create git files. */
    npmrc: function npmrc() {
      this.fs.copy(
        this.templatePath('_npmrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.npmrc'))
      );
    },

    /** Create prettierrc file. */
    prettierrc: function prettierrc() {
      this.fs.copy(
        this.templatePath('_prettierrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.prettierrc'))
      );
    },

    /** Create stylelintrc file. */
    stylelintrc: function stylelintrc() {
      this.fs.copy(
        this.templatePath('_stylelintrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.stylelintrc'))
      );
    },

    /** Create gulpfile. */
    gulpfile: function gulpfile() {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/gulpfile.js'))
      );
    },

    /** Create gulpfile. */
    offline: function offline() {
      this.fs.copy(
        this.templatePath('offline.ejs'),
        this.destinationPath(this.offlinePath)
      );
    },

    /** Create templated targets files. */
    postcssConfig: function postcssConfig() {
      this.fs.copy(
        this.templatePath('postcss.config.js'),
        this.destinationPath(this.postcssConfigPath)
      );
    },

    /** Create templated targets files. */
    wppTargets: function wppTargets() {
      this.fs.copy(
        this.templatePath('template.wpp.targets'),
        this.destinationPath(this.wppTargetsPath)
      );
    },

    /** Create package.json file. */
    packageJson: function packageJson() {
      const contents = {
        name: this.props.appnameSlug,
        version: '0.1.0',
        private: true,
        scripts: {
          start: 'gulp default',
          build: 'gulp build',
          'build-styleguide': 'gulp build-styleguide',
          styleguide: 'gulp styleguide',
        },
        dependencies: {},
        devDependencies: {},
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/package.json')), contents);
    },

    /** Create templated core files. */
    core: function core() {
      this.fs.copyTpl(
        this.templatePath('core/**/*'),
        this.destinationPath(this.corePath)
      );
    },

    /** Create templated fonts files. */
    fonts: function fonts() {
      this.fs.copy(
        this.templatePath('fonts/**/*'),
        this.destinationPath(this.fontsPath),
        this.props
      );
    },

    /** Create templated js files. */
    js: function js() {
      this.fs.copyTpl(
        this.templatePath('js/**/*'),
        this.destinationPath(this.jsPath),
        this.props
      );
    },

    /** Create templated sass files. */
    sass: function sass() {
      this.fs.copyTpl(
        this.templatePath('sass/**/*'),
        this.destinationPath(this.sassPath)
      );
    },

    /** Create templated styleguide files. */
    styleguide: function styleguide() {
      this.fs.copyTpl(
        this.templatePath('styleguide/**/*'),
        this.destinationPath(this.styleguidePath)
      );
    },

    /** Create templated task files. */
    tasks: function tasks() {
      this.fs.copyTpl(
        this.templatePath('tasks/**/*'),
        this.destinationPath(this.tasksPath)
      );
    },
  },

  install: {

    /** Change folder to bower/package.json location. */
    changeToSrcPath: function changeToSrcPath() {
      process.chdir(this.srcPath);
    },

    /** Install npm dependencies. */
    npmInstall: function npmInstall() {
      const npmDependencies = [
        '@netc/core',
        'angular',
        'angular-deferred-bootstrap',
        'angular-sanitize',
        'babel-polyfill',
        'fg-loadcss',
        'gridle',
        'history',
        'jquery',
        'lodash',
        'lodash-es',
        'picturefill',
        'react',
        'react-dom',
        'react-habitat',
        'react-habitat-redux',
        'react-redux',
        'redux',
        'redux-first-router',
        'redux-logger',
        'redux-promise',
        'redux-thunk',
        'sass-rem',
        'slick-carousel',
        'titon-toolkit',
        'webfontloader',
        'whatwg-fetch',
      ];

      const npmDevDependencies = [
        '@frctl/fractal',
        '@frctl/mandelbrot',
        'assets-webpack-plugin',
        'autoprefixer',
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-plugin-lodash',
        'babel-plugin-syntax-dynamic-import',
        'babel-plugin-transform-class-properties',
        'babel-plugin-transform-object-rest-spread',
        'babel-plugin-transform-runtime',
        'babel-preset-env',
        'babel-preset-latest', // todo: remove 'babel-preset-latest' (included for @netc/core)
        'babel-preset-react',
        'browser-sync',
        'chunk-manifest-webpack-plugin',
        'clean-webpack-plugin',
        'copy-webpack-plugin',
        'css-loader',
        'del',
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-airbnb-base',
        'eslint-loader',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'exports-loader',
        'expose-loader',
        'extract-loader',
        'extract-text-webpack-plugin',
        'file-loader',
        'gulp',
        'gulp-modernizr',
        'gulp-svg-sprite',
        'gulp-util',
        'html-loader',
        'html-webpack-plugin',
        'image-webpack-loader',
        'imports-loader',
        'lodash',
        'ng-annotate-loader',
        'ng-annotate-patched',
        'node-sass',
        'offline-plugin',
        'postcss-loader',
        'postcss-pseudoelements',
        'raw-loader',
        'require-dir',
        'sass-loader',
        'style-loader',
        'stylelint',
        'stylelint-config-standard',
        'stylelint-webpack-plugin',
        'url-loader',
        'webpack@^3.0.0', // todo: upgrade to webpack@^4.0.0
        'webpack-bundle-analyzer',
        'webpack-dev-middleware@^2.0.0', // todo: upgrade to webpack-dev-middleware@^3.0.0
        'webpack-hot-middleware',
        'webpack-md5-hash',
        'webpack-merge',
        'webpack-stats-plugin',
        'workbox-webpack-plugin',
      ];

      if (this.props.installPackages) {
        // Install dev dependencies.
        this.npmInstall(npmDevDependencies, {
          msvs_version: this.props.msvs,
          saveDev: true,
        });

        // Install dependencies.
        this.npmInstall(npmDependencies, {
          msvs_version: this.props.msvs,
          save: true,
        });
      }
    },
  },

  end: {

    /** Display completion message. */
    complete: function complete() {
      this.log('Application initialisation completed.');
    },

    /** Run default gulp task. */
    serve: function serve() {
      this.log('Building assets...');
      this.spawnCommand('yarn', ['build']);
    },
  },
});
