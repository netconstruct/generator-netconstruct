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
        default: '2015',
      },

      // ES6?
      {
        type: 'confirm',
        name: 'es6',
        message: 'Would you like to use ES6?',
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
      this.offlinePath = path.join(this.root, 'SiteFiles/src/offline.ejs');
      this.sassPath = path.join(this.root, 'SiteFiles/src/sass');
      this.tasksPath = path.join(this.root, 'SiteFiles/src/tasks');
      this.docsPath = path.join(this.root, 'SiteFiles/src/docs');
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
        mkdirp(this.tasksPath);
        mkdirp(this.docsPath);
      }
    },

    /** Create bower.json file. */
    bowerJson: function bowerJson() {
      const contents = {
        name: this.props.appnameSlug,
        private: true,
        dependencies: {},
        devDependencies: {},
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/bower.json')), contents);
    },

    /** Create babelrc file. */
    babelrc: function babelrc() {
      this.fs.copy(
        this.templatePath('_babelrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.babelrc'))
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

    /** Create stylelintrc file. */
    stylelintrc: function stylelintrc() {
      this.fs.copy(
        this.templatePath('_stylelintrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.stylelintrc'))
      );
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

    /** Create gulpfile. */
    gulpfile: function gulpfile() {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/gulpfile.js'))
      );
    },

    /** Create git files. */
    npm: function npm() {
      this.fs.copy(
        this.templatePath('_npmrc'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.npmrc'))
      );
    },

    /** Create package.json file. */
    packageJson: function packageJson() {
      const contents = {
        name: this.props.appnameSlug,
        version: '2.0.5',
        private: true,
        scripts: {
      	'build-styleguide': 'gulp build-styleguide',
      	'build-dev': 'gulp build-dev',
      	'build-hmr': 'gulp build-hmr',
      	'build-uat': 'gulp build-uat',
      	'build-prd': 'gulp build-prd',
        'styleguide': 'gulp styleguide',
        },
        dependencies: {},
        devDependencies: {},
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/package.json')), contents);
    },

    /** Create templated task files. */
    core: function core() {
      this.fs.copyTpl(
        this.templatePath('core/*'),
        this.destinationPath(this.corePath)
      );
    },

    /** Create templated js files. */
    js: function js() {
      this.fs.copyTpl(
        this.templatePath('js/*'),
        this.destinationPath(this.jsPath),
        this.props
      );
    },

    /** Create gulpfile. */
    offline: function offline() {
      this.fs.copy(
        this.templatePath('offline.ejs'),
        this.destinationPath(this.offlinePath)
      );
    },

    /** Create templated sass files. */
    sass: function sass() {
      this.fs.copyTpl(
        this.templatePath('sass/**/*'),
        this.destinationPath(this.sassPath)
      );
    },

    /** Create templated task files. */
    tasks: function tasks() {
      this.fs.copyTpl(
        this.templatePath('tasks/*'),
        this.destinationPath(this.tasksPath)
      );
    },

    /** Create templated docs files. */
    docs: function docs() {
      this.fs.copyTpl(
        this.templatePath('docs/*'),
        this.destinationPath(this.docsPath)
      );
    },

    /** Create templated targets files. */
    wppTargets: function wppTargets() {
      this.fs.copy(
        this.templatePath('template.wpp.targets'),
        this.destinationPath(this.wppTargetsPath)
      );
    },
  },

  install: {

    /** Change folder to bower/package.json location. */
    changeToSrcPath: function changeToSrcPath() {
      process.chdir(this.srcPath);
    },

    /** Install bower dependencies. */
    bowerInstall: function bowerInstall() {
      // Install dependencies.
      const bowerDependencies = [];

      // Install dev dependencies.
      const bowerDevDependencies = [];

      this.bowerInstall(bowerDependencies, {
        save: true,
      });

      this.bowerInstall(bowerDevDependencies, {
        saveDev: true,
      });
    },

    /** Install npm dependencies. */
    npmInstall: function npmInstall() {
      const npmDependencies = [
        '@netc/core',
        'angular',
        'angular-animate',
        'angular-deferred-bootstrap',
        'angular-loading-bar',
        'angular-sanitize',
        'angular-ui-router',
        'babel-polyfill',
        'fg-loadcss',
        'gridle',
        'gulp-svg-sprite',
        'jquery',
        'sass-rem',
        'slick-carousel',
        'titon-toolkit',
      ];

      const npmDevDependencies = [
        '@frctl/fractal',
        '@frctl/mandelbrot',
        'assets-webpack-plugin',
        'autoprefixer',
        'babel-core',
        'babel-eslint',
        'babel-loader',
        'babel-plugin-transform-class-properties',
        'babel-plugin-transform-object-rest-spread',
        'babel-preset-env',
        'babel-preset-latest',
        'browser-sync',
        'chunk-manifest-webpack-plugin',
        'clean-webpack-plugin',
        'css-loader',
        'del',
        'eslint',
        'eslint-config-airbnb-base',
        'eslint-loader',
        'eslint-plugin-import',
        'exports-loader',
        'expose-loader',
        'extract-text-webpack-plugin',
        'file-loader',
        'gulp',
        'gulp-modernizr',
        'gulp-util',
        'html-loader',
        'html-webpack-plugin',
        'image-webpack-loader',
        'imports-loader',
        'lodash',
        'ng-annotate-loader',
        'node-sass',
        'offline-plugin',
        'postcss-loader',
        'postcss-pseudoelements',
        'raw-loader',
        'require-dir',
        'sass-loader',
        'style-loader',
        'stylelint-config-standard',
        'stylelint-webpack-plugin',
        'url-loader',
        'webpack',
        'webpack-bundle-analyzer',
        'webpack-dev-middleware',
        'webpack-hot-middleware',
        'webpack-md5-hash',
        'webpack-merge',
        'webpack-stats-plugin',
      ];

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
    },
  },

  end: {

    /** Display completion message. */
    complete: function complete() {
      this.log('Application initialisation completed.');
    },

    /** Run default gulp task. */
    serve: function serve() {
      this.log('Running gulp.');
      this.spawnCommand('gulp', ['build-dev']);
    },
  },
});
