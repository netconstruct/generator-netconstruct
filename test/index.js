'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-netconstruct:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        'appname': 'Example',
        'createFolderStructure': true,
        'destinationRoot': 'CMS/',
        'msvs': 2012
      })
      .on('end', done);
  });

  it('creates files', function () {

    // Check folder structure was created.
    assert.file([
      'CMS\\SiteFiles\\src\\tasks',
      'CMS\\SiteFiles\\src\\ui',
      'CMS\\SiteFiles\\src\\ui\\fonts',
      'CMS\\SiteFiles\\src\\ui\\img',
      'CMS\\SiteFiles\\src\\ui\\js',
      'CMS\\SiteFiles\\src\\ui\\sass'
    ]);

    // Check default files were created.
    assert.file([
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      '.yo-rc.json',
      'CMS\\SiteFiles\\src\\bower.json',
      'CMS\\SiteFiles\\src\\gulpfile.js',
      'CMS\\SiteFiles\\src\\package.json',
      'CMS\\SiteFiles\\src\\ui\\js\\main.js',
      'CMS\\SiteFiles\\src\\ui\\sass\\main.scss'
    ]);
  });
});
