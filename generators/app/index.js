/* eslint-disable max-len, prefer-template */

'use strict';

const _s = require('underscore.string');
const mkdirp = require('mkdirp');
const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  /** Initialise generator. */
  initializing() {
    this.pkg = require('../../package.json');
    this.props = this.config.get('props');
  }

  /** Set generator prompts. */
  prompting() {
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
  }

  configuring() {
    // Set config.
    this.config.set({
      props: this.props,
    });

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

    /** Set app name properties. */
    this.props.appnameSlug = _s.slugify(this.props.appname);
  }

  writing() {
    /** Create folder structure. */
    if (this.props.createFolderStructure) {
      this.log('Create folder structure...');
      mkdirp(this.fontsPath);
      mkdirp(this.imgPath);
      mkdirp(this.jsPath);
      mkdirp(this.sassPath);
      mkdirp(this.styleguidePath);
      mkdirp(this.tasksPath);
    }

    this.log('Create boilerplate...');

    /** Create gitignore files. */
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));

    /** Create gitignore files. */
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));

    /** Create gitattributes files. */
    this.fs.copy(this.templatePath('_gitattributes'), this.destinationPath('.gitattributes'));

    /** Create babelrc file. */
    this.fs.copy(
      this.templatePath('_babelrc'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.babelrc'))
    );

    /** Create editorconfig file. */
    this.fs.copy(
      this.templatePath('_editorconfig'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.editorconfig'))
    );

    /** Create eslintignore file. */
    this.fs.copy(
      this.templatePath('_eslintignore'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintignore'))
    );

    /** Create eslintrc file. */
    this.fs.copy(
      this.templatePath('_eslintrc'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.eslintrc'))
    );

    /** Create prettierrc file. */
    this.fs.copy(
      this.templatePath('_prettierrc'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.prettierrc'))
    );

    /** Create stylelintrc file. */
    this.fs.copy(
      this.templatePath('_stylelintrc'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/.stylelintrc'))
    );

    /** Create gulpfile. */
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath(path.join(this.root, 'SiteFiles/src/gulpfile.js'))
    );

    /** Create offline template. */
    this.fs.copy(this.templatePath('offline.ejs'), this.destinationPath(this.offlinePath));

    /** Create postcss config file. */
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath(this.postcssConfigPath)
    );

    /** Create templated targets file. */
    this.fs.copy(
      this.templatePath('template.wpp.targets'),
      this.destinationPath(this.wppTargetsPath)
    );

    /** Create package.json file. */
    const contents = {
      name: this.props.appnameSlug,
      version: '0.1.0',
      private: true,
      browserslist: [
        'last 2 Chrome versions',
        'last 2 Edge versions',
        'last 2 firefox versions',
        'IE 11',
        'iOS 10',
        'iOS 11',
        'last 3 ChromeAndroid versions',
        'last 2 Safari versions',
      ],
      scripts: {
        start: 'gulp default',
        build: 'gulp build',
        'build-styleguide': 'gulp build-styleguide',
        styleguide: 'gulp styleguide',
      },
      dependencies: {},
      devDependencies: {},
    };

    this.fs.writeJSON(
      this.destinationPath(path.join(this.root, 'SiteFiles/src/package.json')),
      contents
    );

    /** Create templated core files. */
    this.fs.copyTpl(this.templatePath('core/**/*'), this.destinationPath(this.corePath));

    /** Create templated fonts files. */
    this.fs.copy(this.templatePath('fonts/**/*'), this.destinationPath(this.fontsPath), this.props);

    /** Create templated js files. */
    this.fs.copyTpl(this.templatePath('js/**/*'), this.destinationPath(this.jsPath), this.props);

    /** Create templated sass files. */
    this.fs.copyTpl(this.templatePath('sass/**/*'), this.destinationPath(this.sassPath));

    /** Create templated styleguide files. */
    this.fs.copyTpl(
      this.templatePath('styleguide/**/*'),
      this.destinationPath(this.styleguidePath)
    );

    /** Create templated task files. */
    this.fs.copyTpl(this.templatePath('tasks/**/*'), this.destinationPath(this.tasksPath));
  }

  install() {
    this.log('Installing NPM dependencies...');

    /** Change folder to bower/package.json location. */
    process.chdir(this.srcPath);

    /** Install npm dependencies. */
    const dependencies = [
      '@netc/core',
      'babel-polyfill',
      'fg-loadcss',
      'history',
      'jquery',
      'lodash',
      'lodash-es',
      'picturefill',
      'preact',
      'preact-compat',
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
      'sass-mq',
      'webfontloader',
      'whatwg-fetch',
    ];

    const devDependencies = [
      '@frctl/fractal',
      '@frctl/mandelbrot',
      'autoprefixer',
      'babel-core@6',
      'babel-eslint',
      'babel-loader@7',
      'babel-plugin-lodash',
      'babel-plugin-syntax-dynamic-import',
      'babel-plugin-transform-class-properties',
      'babel-plugin-transform-object-rest-spread',
      'babel-plugin-transform-runtime',
      'babel-preset-env',
      'babel-preset-latest', // todo: remove 'babel-preset-latest' (included for @netc/core)
      'babel-preset-react',
      'browser-sync',
      'clean-webpack-plugin',
      'copy-webpack-plugin',
      'css-loader',
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
      'file-loader',
      'gulp',
      'gulp-modernizr',
      'gulp-svg-sprite',
      'gulp-util',
      'html-loader',
      'html-webpack-plugin',
      'image-webpack-loader',
      'imports-loader',
      'mini-css-extract-plugin',
      'node-sass',
      'postcss-loader',
      'postcss-flexbugs-fixes',
      'postcss-ie11-supports',
      'postcss-normalize',
      'postcss-pseudoelements',
      'postcss-pxtorem',
      'prettier-eslint',
      'query-string',
      'raw-loader',
      'require-dir',
      'sass-loader',
      'style-loader',
      'url-loader',
      'webpack@^4.1.0',
      'webpack-assets-manifest',
      'webpack-dev-middleware@^3.0.0',
      'webpack-hot-middleware',
      'webpack-merge',
      'webpack-stats-plugin',
      'workbox-webpack-plugin',
    ];

    if (this.props.installPackages) {
      // Install dev dependencies.
      this.yarnInstall(devDependencies, { dev: true });

      // Install dependencies.
      this.yarnInstall(dependencies);
    }
  }

  end() {
    /** Display completion message. */
    this.log('Application initialisation completed.');

    /** Run default gulp task. */
    this.log('Building assets and styleguide...');
    this.spawnCommand('yarn', ['build-styleguide']);
  }
};
