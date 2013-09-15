(function() {
  "use strict";

  describe("<%= pluginFullName %>", function() {

    var parent, slides, deck,

      createDeck = function() {
        var PARENT_TAG = 'article',
          SLIDE_TAG = 'section';

        slides = [];

        parent = document.createElement(PARENT_TAG);
        for (var i = 0; i < 10; i++) {
          slides.push(document.createElement(SLIDE_TAG));
          parent.appendChild(slides[i]);
        }

        document.body.appendChild(parent);

        deck = bespoke.from(PARENT_TAG, {
          myplugin: true
        });
      },

      destroyDeck = function() {
        document.body.removeChild(parent);
      };

    beforeEach(createDeck);
    afterEach(destroyDeck);

    describe("when a slide is activated", function() {

      beforeEach(function() {
        deck.slide(0);
      });

      it("should not a useless 'foobar' class to the slide", function() {
        expect(slides[0].classList.contains('foobar')).toBe(false);
      });

    });

  });

}());
