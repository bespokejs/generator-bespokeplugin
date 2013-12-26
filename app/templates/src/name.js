bespoke.plugins.<%= pluginNameCamelized %> = function(deck) {

  /*
    Interact with the deck
    https://github.com/markdalgleish/bespoke.js#deck-instances
  */
  deck.next();
  deck.prev();
  deck.slide(0);

  /*
     Slide events
     https://github.com/markdalgleish/bespoke.js#events
  */
  deck.on('activate', function(e) {
    console.log('Slide #' + e.index + ' was activated!', e.slide);
  });

  deck.on('deactivate', function(e) {
    console.log('Slide #' + e.index + ' was deactivated!', e.slide);
  });

  /*
    Deck interaction events, return false to cancel
    https://github.com/markdalgleish/bespoke.js#deck-interaction-events
  */

  deck.on('next', function(e) {
    console.log('The next slide is #' + (e.index + 1), deck.slides[e.index + 1]);
  });

  deck.on('prev', function(e) {
    console.log('The previous slide is #' + (e.index - 1), deck.slides[e.index - 1]);
  });

  deck.on('slide', function(e) {
    console.log('The requested slide is #' + e.index, e.slide);
  });
};
