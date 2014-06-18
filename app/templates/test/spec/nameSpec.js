Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke');
var <%= pluginNameCamelized %> = require('../../lib-instrumented/<%= pluginFullName %>.js');

describe("<%= pluginFullName %>", function() {

  var deck,

    createDeck = function() {
      var parent = document.createElement('article');
      for (var i = 0; i < 10; i++) {
        parent.appendChild(document.createElement('section'));
      }

      deck = bespoke.from(parent, [
        <%= pluginNameCamelized %>()
      ]);
    };

  beforeEach(createDeck);

  describe("deck.slide", function() {

    beforeEach(function() {
      deck.slide(0);
    });

    it("should not add a useless 'foobar' class to the slide", function() {
      expect(deck.slides[0].classList.contains('foobar')).toBe(false);
    });

  });

});
