bespoke.from('article', [
  bespoke.plugins.keys(),
  bespoke.plugins.touch(),
  bespoke.plugins.<%= pluginNameCamelized %>()
]);
