[![Build Status](https://secure.travis-ci.org/<%= githubUser %>/<%= pluginFullName %>.png?branch=master)](https://travis-ci.org/<%= githubUser %>/<%= pluginFullName %>) [![Coverage Status](https://coveralls.io/repos/<%= githubUser %>/<%= pluginFullName %>/badge.png)](https://coveralls.io/r/<%= githubUser %>/<%= pluginFullName %>)

# <%= pluginFullName %>

<%= pluginDescription.replace(/Bespoke\.js/g, '[Bespoke.js](http://markdalgleish.com/projects/bespoke.js)') %>

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.min.js
[max]: https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.js

## Usage

This plugin is shipped in a [UMD format](https://github.com/umdjs/umd), meaning that it is available as a CommonJS/AMD module or browser global.

For example, when using CommonJS modules:

```js
var bespoke = require('bespoke'),
  <%= pluginNameCamelized %> = require('bespoke-<%= pluginNameCamelized %>');

bespoke.from('#presentation', [
  <%= pluginNameCamelized %>()
]);
```

When using browser globals:

```js
bespoke.from('#presentation', [
  bespoke.plugins.<%= pluginNameCamelized %>()
]);
```

## Package managers

### npm

```bash
$ npm install <%= pluginFullName %>
```

### Bower

```bash
$ bower install <%= pluginFullName %>
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
