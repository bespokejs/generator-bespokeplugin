[![Build Status](https://secure.travis-ci.org/markdalgleish/generator-bespokeplugin.png?branch=master)](https://travis-ci.org/markdalgleish/generator-bespokeplugin)

# Bespoke.js Plugin Generator

A generator for [Yeoman](http://yeoman.io) that scaffolds a [Bespoke.js](http://markdalgleish.com/projects/bespoke.js) plugin.

The boilerplate plugin includes a [Gulp](gulpjs.com) build system with [Browserify](http://browserify.org), [JSHint](http://www.jshint.com/), [Karma](karma-runner.github.io), [Istanbul](http://gotwarlost.github.io/istanbul), [Travis CI](https://travis-ci.org/) and [Coveralls](https://coveralls.io) preconfigured.

## Usage

Assuming you have [Node.js](http://nodejs.org), install `generator-bespokeplugin`:
```bash
$ npm install -g generator-bespokeplugin
```

Make a new directory and `cd` into it:
```bash
$ mkdir bespoke-myplugin
$ cd bespoke-myplugin
```

Scaffold a new presentation:
```bash
$ yo bespokeplugin
```

## Plugin workflow

All source files for the plugin reside in the `lib` directory.

[Jasmine](http://pivotal.github.io/jasmine/) specs reside in the `test/spec` directory.

Distributable versions of your plugin are generated in the `dist` directory by the following [gulp](https://github.com/gulpjs/gulp) tasks:

### Gulp tasks

Lint, test, and compile the project:

```bash
$ gulp
```

Lint and test your plugin whenever source files change:

```bash
$ gulp dev
```

### Publish to npm

```bash
$ npm publish
```

### Register with Bower

Register plugin with [Bower](http://bower.io/):

```bash
$ bower register <my-plugin-name> <git-endpoint>
```

Bower uses [Git tags](http://git-scm.com/book/en/Git-Basics-Tagging) for versioning.

To publish an update, first modify the version number in `bower.json`, then tag a new version and push to origin:

```bash
$ git add .
$ git commit -m "Bump to vX.X.X"
$ git tag -a vX.X.X -m "vX.X.X"
$ git push --tags origin master
```

## License

[MIT License](http://markdalgleish.mit-license.org)
