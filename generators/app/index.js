'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
// var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
    },

    initializing: function () {
        this.pkg = require('../../package.json');
    },

    askFor: function () {
        var done = this.async();

        // Welcome message.
        this.log(yosay('Welcome to the ' + chalk.green('Netconstruct') + ' generator!'));

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
                message: 'What is the project root path?',
                default: 'CMS/'
            },

            // Create folder structure?
            {
                type: 'confirm',
                name: 'createFolderStructure',
                message: 'Would you like to create the standard folder structure?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {
            this.props = props;

            // Set app name.
            this.props.appname = this.props.appname || this.appname;

            // Set root path.
            this.root = this.destinationRoot();

            if (this.props.destinationRoot && this.props.destinationRoot.length) {
                this.root = this.destinationPath(this.props.destinationRoot);
            }

            // Ensure root path is valid.
            if (this.root.substring(this.root.length - 1) !== '/') {
                this.root = this.root + '/';
            }

            done();
        }.bind(this));
    },

    writing: {
        createFolderStructure: function () {

            // Create folder structure.
            if (this.props.createFolderStructure) {
                mkdirp(this.root + 'SiteFiles/src/tasks');
                mkdirp(this.root + 'SiteFiles/src/ui/fonts');
                mkdirp(this.root + 'SiteFiles/src/ui/img');
                mkdirp(this.root + 'SiteFiles/src/ui/js');
                mkdirp(this.root + 'SiteFiles/src/ui/scss');
            }
        },

        bowerJson: function () {
            var bowerJson = {
                name: _s.slugify(this.props.appname),
                private: true,
                dependencies: {},
                devDependencies: {}
            };

            this.fs.writeJSON(this.destinationPath(this.root + 'SiteFiles/src/bower.json'), bowerJson);
        },

        packageJson: function () {
            var packageJson = {
                name: _s.slugify(this.props.appname),
                private: true,
                dependencies: {},
                devDependencies: {}
            };

            this.fs.writeJSON(this.destinationPath(this.root + 'SiteFiles/src/package.json'), packageJson);
        },

        jshint: function () {
            this.fs.copy(
                this.templatePath('_jshintrc'),
                this.destinationPath(this.root + '.jshintrc')
            );
        },

        gulpfile: function () {
            this.fs.copy(
                this.templatePath('gulpfile.js'),
                this.destinationPath(this.root + 'SiteFiles/src/tasks/gulpfile.js')
            );
        },

        webpack: function () {
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );
        },

        git: function () {
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );

            this.fs.copy(
                this.templatePath('_gitattributes'),
                this.destinationPath('.gitattributes')
            );
        },
    }
});
