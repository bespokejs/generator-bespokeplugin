[![Build Status](https://secure.travis-ci.org/markdalgleish/generator-bespokeplugin.png?branch=master)](https://travis-ci.org/markdalgleish/generator-bespokeplugin)

# Bespoke.js Plugin Generator

A generator for [Yeoman](http://yeoman.io) that scaffolds a [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) plugin.

This is a work in progress.

## Plugin workflow

All source files for the plugin reside in the `src` directory.

[Jasmine](http://pivotal.github.io/jasmine/) specs reside in the `spec` directory.

Distributable versions of your plugin are generated in the `dist` directory by the following [Grunt](http://gruntjs.com/) tasks:

### Grunt tasks

Lint, test, concatenate and minify source files:

```bash
$ grunt
```

Lint and test your plugin whenever source files change:

```bash
$ grunt watch
```

By default, your plugin is validated with [grunt-micro](https://github.com/markdalgleish/grunt-micro) to ensure it is less than 1KB.

### Publish to Bower

Publish initial version to [Bower](http://bower.io/):

```bash
$ bower publish
```

Bower uses [Git tags](http://git-scm.com/book/en/Git-Basics-Tagging) for versioning.

To publish an update, first modify the version number in `bower.json`, then tag a new version and push to origin:

```bash
$ git add .
$ git commit -m "Bump to vX.X.X"
$ git tag -a vX.X.X -m "vX.X.X"
$ git push --tags origin master
```

### Publish to npm

By default, your plugin is configured to work with [browserify](browserify.org).

```bash
$ npm publish
```

## License

[MIT License](http://markdalgleish.mit-license.org)
