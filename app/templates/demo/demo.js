bespoke.from('article', [
  bespoke.plugins.keys(),
  bespoke.plugins.touch(),
  bespoke.plugins.classes(),
  bespoke.plugins.<%= pluginNameCamelized %>()
]);
