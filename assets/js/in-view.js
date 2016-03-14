/**
 * In-view.js
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Anders Grendstadbakk http://andeers.com
 */

// Could support node'n stuff here.
var _self = window;

var InView = (function(){

  var _ = _self.InView = {
    ticking: false,
    latestKnownScrollY: 0,
    initialized: false,

    defaultOptions: {
      offset: -50,
      elementClass: '.in-view',
      seenClass: 'visible',
      winHeight: window.innerHeight
    },
    settings: {},
    elements: [], 

    /**
     * Get started.
     */
    init: function(options) {

      if (typeof options == 'undefined') {
        _.settings = _.defaultOptions;
      }
      else {
        _.settings = _.mergeOptions(_.defaultOptions, options);
      }
      _.findElements();
      _.initialized = true;

      window.addEventListener('scroll', _.onScroll, false);
    },

    /**
     * Merge defaults with user provided options.
     */
    mergeOptions: function(defaults, options){
      var mergedOptions = {};
      for (var attrname in defaults) { mergedOptions[attrname] = defaults[attrname]; }
      for (var attrname in options) { mergedOptions[attrname] = options[attrname]; }
      return mergedOptions;
    },

    /**
     * Find all the elements we should monitor.
     */
    findElements: function() {
      var elementsNodeList = document.querySelectorAll(_.settings.elementClass);
      for (var i = 0; i < elementsNodeList.length; i++) {
          var self = elementsNodeList[i];
          _.elements.push(self);
      }
    },

    /**
     * Initializes the script and triggers the events on scroll.
     */
    onScroll: function() {
      if (!_.initialized) {
        _.init();
      }

      _.latestKnownScrollY = window.scrollY;
      _.requestTick();
    },

    /**
     * If we don't work with the elements we trigger the next update.
     */
    requestTick: function() {
    	if(!_.ticking) {
    		requestAnimationFrame(_.update);
    	}
    	_.ticking = true;
    },

    /**
     * Check if a element is visible in the viewport.
     *
     * Adds a class and remove it from the list.
     */
    update: function() {
      _.ticking = false;
      var currentScrollY = _.latestKnownScrollY;
      var scrollY = currentScrollY + _.settings.winHeight;
    
      if (_.elements.length == 0) {
        window.removeEventListener('scroll', _.onScroll(), false);
      }
    
      for(var m = 0; m < _.elements.length; m++) {
        element = _.elements[m];
    
        if ((element.offsetTop < scrollY) || (element.offsetTop - scrollY < _.settings.offset)) {
          console.log(element.offsetTop + ' - ' + scrollY);

          element.classList.add(_.settings.seenClass);
          _.elements.splice(m, 1);
        }
      }
    }
    
	};


  // Get current script and highlight
  var script = document.getElementsByTagName('script');

  script = script[script.length - 1];

  if (script) {
	  _.filename = script.src;

    // If we don't see the manual tag we just initialize.
	  if (document.addEventListener && !script.hasAttribute('data-manual')) {
		  window.addEventListener('scroll', _.onScroll, false);
	  }
  }

  return _self.InView;
})();
