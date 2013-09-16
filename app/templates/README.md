[![Build Status](https://secure.travis-ci.org/<%= githubUser %>/<%= pluginFullName %>.png?branch=master)](https://travis-ci.org/<%= githubUser %>/<%= pluginFullName %>)

# <%= pluginFullName %>

<%= pluginDescription.replace(/Bespoke\.js/g, '[Bespoke.js](http://markdalgleish.com/projects/bespoke.js)') %>

## Download

Download the [production version][min] or the [development version][max], or use a [package manager](#package-managers).

[min]: https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.min.js
[max]: https://raw.github.com/<%= githubUser %>/<%= pluginFullName %>/master/dist/<%= pluginFullName %>.js

## Usage

First, include both `bespoke.js` and `<%= pluginFullName %>.js` in your page.

Then, simply include the plugin when instantiating your presentation.

```js
bespoke.horizontal.from('article', {
  <%= pluginNameCamelized %>: true
});
```

## Package managers

### Bower

```bash
$ bower install <%= pluginFullName %>
```

### npm

```bash
$ npm install <%= pluginFullName %>
```

The <%= pluginFullName %> npm package is designed for use with [browserify](http://browserify.org/), e.g.

```js
require('bespoke');
require('<%= pluginFullName %>');
```

## Credits

This plugin was built with [generator-bespokeplugin](https://github.com/markdalgleish/generator-bespokeplugin).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
