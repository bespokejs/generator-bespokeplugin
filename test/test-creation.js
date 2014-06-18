/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
  helpers = require('yeoman-generator').test;

describe('bespokeplugin generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('bespokeplugin:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      'bower.json',
      'CONTRIBUTING.md',
      'gulpfile.js',
      'LICENSE',
      'package.json',
      'README.md',
      'lib/bespoke-foobar.js',
      'test/spec/bespoke-foobarSpec.js'
    ];

    helpers.mockPrompt(this.app, {
      'pluginName': 'foobar',
      'pluginDescription': 'Foo bar baz',
      'githubUser': ''
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
