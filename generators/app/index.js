'use strict';

var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var path = require('path');
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
      done();
      return;
    }

    var prompts = [
      // Application name?
      {
        type: 'input',
        name: 'appname',
        message: 'What is the application name?',
        default: 'Example'
      },

      // Root path?
      {
        type: 'input',
        name: 'destinationRoot',
        message: 'What is the web project root path?',
        default: 'CMS'
      },

      // Create folder structure?
      {
        type: 'confirm',
        name: 'createFolderStructure',
        message: 'Would you like to create the standard folder structure?',
        default: true
      },

      // Visual Studio version?
      {
        type: 'input',
        name: 'msvs',
        message: 'Which Visual Studio version is installed?',
        default: '2015'
      },

      // ES6?
      {
        type: 'confirm',
        name: 'es6',
        message: 'Would you like to use ES6?',
        default: true
      }
    ];

    this.prompt(prompts, function(props) {
      this.props = props;

      // Set app name.
      this.props.appname = this.props.appname || this.appname;

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

    /** Set path properties. */
    setPaths: function() {
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

    /** Set app name properties. */
    setAppName: function() {
      this.props.appnameSlug = _s.slugify(this.props.appname);
    }
  },

  writing: {

    /** Create folder structure. */
    createFolderStructure: function() {
      if (this.props.createFolderStructure) {
        mkdirp(this.fontsPath);
        mkdirp(this.imgPath);
        mkdirp(this.jsPath);
        mkdirp(this.sassPath);
        mkdirp(this.tasksPath);
      }
    },

    /** Create bower.json file. */
    bowerJson: function() {
      var bowerJson = {
        name: this.props.appnameSlug,
        private: true,
        dependencies: {},
        devDependencies: {}
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/bower.json')), bowerJson);
    },

    /** Create babelrc file. */
    babelrc: function() {
      var babelrc = {
        presets: ['es2015']
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/.babelrc')), babelrc);
    },

    /** Create eslintignore file. */
    eslintignore: function() {
      this.fs.copy(
        this.templatePath('_eslintignore'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintignore'))
      );
    },

    /** Create eslintrc file. */
    eslintrc: function() {
      var eslintrc = {
        env: {
          browser: true,
          es6: true
        },
        extends: ['airbnb-base'],
        globals: {
          'angular': false,
          'DEBUG': false,
        },
        rules: {
          'global-require': 'off',
          'no-use-before-define': ['error', { 'functions': false, 'classes': true }],
          "import/no-unresolved": "off"
        },
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintrc')), eslintrc);
    },

    /** Create git files. */
    git: function() {
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
    gulpfile: function() {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath(path.join(this.root, 'SiteFiles/src/gulpfile.js'))
      );
    },

    /** Create package.json file. */
    packageJson: function() {
      var packageJson = {
        name: this.props.appnameSlug,
        private: true,
        dependencies: {},
        devDependencies: {}
      };

      this.fs.writeJSON(this.destinationPath(path.join(this.root, 'SiteFiles/src/package.json')), packageJson);
    },

    /** Create templated js files. */
    js: function() {
      this.fs.copyTpl(
        this.templatePath('js/*'),
        this.destinationPath(this.jsPath),
        this.props
      );
    },

    /** Create templated sass files. */
    sass: function() {
      this.fs.copyTpl(
        this.templatePath('sass/**/*'),
        this.destinationPath(this.sassPath)
      );
    },

    /** Create templated task files. */
    tasks: function() {
      this.fs.copyTpl(
        this.templatePath('tasks/*'),
        this.destinationPath(this.tasksPath)
      );
    }
  },

  install: {

    /** Change folder to bower/package.json location. */
    changeToSrcPath: function() {
      process.chdir(this.srcPath);
    },

    /** Install bower dependencies. */
    bowerInstall: function() {

      // Install dependencies.
      var bowerDependencies = [];

      // Install dev dependencies.
      var bowerDevDependencies = [];

      this.bowerInstall(bowerDependencies, {
        'save': true
      });

      this.bowerInstall(bowerDevDependencies, {
        'saveDev': true
      });
    },

    /** Install npm dependencies. */
    npmInstall: function() {

      var npmDependencies = [
        'angular',
        'angular-animate',
        'angular-deferred-bootstrap',
        'angular-loading-bar',
        'angular-sanitize',
        'angular-ui-router',
        'babel-polyfill',
        'gridle',
        'jquery',
				'sass-rem',
				'slick-carousel',
				'titon-toolkit'
      ];

      var npmDevDependencies = [
        'autoprefixer',
        'babel-core',
        'babel-loader',
        'babel-preset-es2015',
        'bower-webpack-plugin',
        'browser-sync',
        'clean-webpack-plugin',
        'css-loader',
        'del',
        'eslint',
        'eslint-loader',
        'eslint-config-airbnb-base',
        'eslint-plugin-import',
        'exports-loader',
        'expose-loader',
        'extend',
        'extract-text-webpack-plugin',
        'file-loader',
        'gulp',
        'gulp-modernizr',
        'gulp-util',
        'html-loader',
        'image-webpack-loader',
        'imports-loader',
        'lodash',
        'ng-annotate-loader',
        'node-sass',
        'postcss-loader',
        'postcss-pseudoelements',
        'raw-loader',
        'require-dir',
        'sass-loader',
        'url-loader',
        'webpack',
        'webpack-dev-middleware',
        'webpack-hot-middleware'
      ];

      // Install dependencies.
      this.npmInstall(npmDependencies, {
        'msvs_version': this.props.msvs,
        'save': true
      });

      // Install dev dependencies.
      this.npmInstall(npmDevDependencies, {
        'msvs_version': this.props.msvs,
        'saveDev': true
      });
    }
  },

  end: {

    /** Display completion message. */
    complete: function() {
      this.log('Application initialisation completed.');
    },

    /** Run default gulp task. */
    serve: function() {
      this.log('Running gulp.');
      this.spawnCommand('gulp', ['build']);
    }
  }
});
