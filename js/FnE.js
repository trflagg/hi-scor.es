var FnE = function() {
	/**
	 * PageForm
	 * Responsible for holding the elements on the page.
	 * Singleton pattern from http://stackoverflow.com/questions/1635800/javascript-best-singleton-pattern
	 */
	function PageForm() {
		// make a singleton
		if ( PageForm.prototype._singletonInstance ) {
			return PageForm.prototype._singletonInstance;
		}
		PageForm.prototype._singletonInstance = this;

		
		this._elements = {};
	}

	PageForm.prototype = {
		_windowWidth : null,
		_windowHeight : null,

		registerSelectors : function(selectors) {
			for (var i=0, ll=selectors.length; i<ll; i++) {
				this.registerSelector(selectors[i]);
			}
		},

		registerSelector : function(selector) {
			this.addElement(new Element(selector));
		},

		addElement : function(element) {
			this._elements[element.selector()] = element;
		},
		element : function(element) {
			return this._elements[element];
		},

		resize : function() {

			for (var key in this._elements) {
				if (this._elements.hasOwnProperty(key)) {
					var element = this._elements[key];
					if (element.position) {
						// save the animated property and restore it afterwards
						var animState = element.isAnimated();
						element.animate(false);
						
						// recalculate every time because it may change from previous call
						this._windowHeight = $(window).height();
						this._windowWidth = $(window).width();

						element.position(this._windowWidth, this._windowHeight);
						
						element.animate(animState);
					}
				}
			}
		}
	};

	 
	/**
	 * Element
	 * Represents an item on the page (img, p, ul, svg, etc).
	 * Can manipulate position, dimensions, and animation
	 */
	function Element (jquery, selector) {

		// one argument : string that is a jquery selector
		if (typeof jquery === "string") {
			this._selector = jquery;
			this._jquery = $(jquery);
		}
		// otherwise, a jquery object and a string for id
		else {
			this._jquery = jquery;
			this._selector = selector;
		}
	}

	Element.prototype = {
		_jquery : null,
		_selector : null,
		_animated : false,
		_duration : null,
		_timingFunction : null,
		_animatingProperty : null,
		_animatedValue : null,
		_nextAnimationFrame : null,
		_animationTimer : null,

		_hoverHandlerIn : null,
		_hoverHandlerOut : null,
		_clickHandler : null,

		// animation controls
		animate : function(turnOn) {
			if (turnOn === undefined) {
				turnOn = true;
			}
			if (turnOn) {
				this.removeClass("FnE_AnimateNone");
				this.addClass("FnE_AnimateAll");
				this._animated = true;
			}
			else {
				this.removeClass("FnE_AnimateAll");
				this.addClass("FnE_AnimateNone");
				this._animated = false;
			}
			return this;
		},
		animationDuration : function(durationInMiliseconds) {
			if (durationInMiliseconds === undefined) {
				return this._duration;
			}
			this._duration = durationInMiliseconds;
			this._jquery.css("-webkit-transition-duration", durationInMiliseconds+"ms");
			this._jquery.css("-moz-transition-duration", durationInMiliseconds+"ms");
			this._jquery.css("-o-transition-duration", durationInMiliseconds+"ms");
			this._jquery.css("-ms-transition-duration", durationInMiliseconds+"ms");
			this._jquery.css("transition-duration", durationInMiliseconds+"ms");
			return this;
		},
		animationTimingFunction : function(timingFunction) {
			if (timingFunction === undefined) {
				return this._timingFunction;
			}
			this._timingFunction = timingFunction;
			this._jquery.css("-webkit-transition-timing-function", timingFunction);
			this._jquery.css("-moz-transition-timing-function", timingFunction);
			this._jquery.css("-o-transition-timing-function", timingFunction);
			this._jquery.css("-ms-transition-timing-function", timingFunction);
			this._jquery.css("transition-timing-function", timingFunction);
			return this;
		},
		isAnimated : function() {
			return this._animated;
		},
		animateProperty : function(propertyName, value) {
			this.animate();
			this._jquery.css("-webkit-transition-property", propertyName);
			this._jquery.css("-moz-transition-property", propertyName);
			this._jquery.css("-o-transition-property", propertyName);
			this._jquery.css("-ms-transition-property", propertyName);
			this._jquery.css("transition-property", propertyName);
			this._animatingProperty = propertyName;
			this._animatedValue = value;
			this.css(propertyName, value);

			//set timer so we guarantee animation frames complete
			if(this._nextAnimationFrame) {
				var thisElement = this;
				this._animationTimer = window.setTimeout(this._nextAnimationFrame, this._duration + 200);
			}

			return this;
		},

		runFrame : function(frame) {
			// for now, frames are just functions.
			// Running a frame is just running it
			frame.call(this);
		},
		runAnimation : function(frames) {
			// use the same closure variable as in onHover()
			var thisElement = this;

			this.animate(true);
			this._currentFrame = 0;
			this._frames = frames;

			// every time a frame finishes
			// call a function that increments the counter 
			// and calls the next frame.
			this._nextAnimationFrame = function() {
				if (thisElement._animationTimer) {
					window.clearTimeout(thisElement._animationTimer);
					thisElement._animationTimer = null;
				}
				if (thisElement._currentFrame < thisElement._frames.length) {
					thisElement._currentFrame++;
					thisElement.runFrame(thisElement._frames[thisElement._currentFrame]);
				}
				else {
					// done. 
					thisElement.animate(false);
					//destroy self?
					thisElement._nextAnimationFrame = null;
				}
			};
			this._jquery.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', this._nextAnimationFrame);

			// call first frame to kick it off.
			this.runFrame(this._frames[this._currentFrame]);

			return this;
		},

		// class handlers
		addClass : function(className) {
			this._jquery.addClass(className);
			return this;
		},
		removeClass : function(className) {
			this._jquery.removeClass(className);
			return this;
		},

		// event handlers
		onClick : function(clickHandler) {
			var thisElement = this;
			this._clickHandler = clickHandler;
			this._jquery.click(function(eventObject) {thisElement._clickHandler(eventObject);});
			return this;
		},
		onHover : function(hoverHandlerIn, hoverHandlerOut) {
			// use a closure variable to hold the element object
			var thisElement = this;
			
			this._hoverHandlerIn = hoverHandlerIn;

			if (hoverHandlerOut) {
				this._hoverHandlerOut = hoverHandlerOut;
				// use an anonymous function so that jQuery calls the handler on current Element object
				// this way we can use 'this' in our handler and refer to the Element object instead of the jQuery object
				this._jquery.hover(function(eventObject) {thisElement._hoverHandlerIn(eventObject);}, function(eventObject) {thisElement._hoverHandlerOut(eventObject);});
			}
			else {
				this._jquery.hover(function(eventObject) {thisElement._hoverHandlerIn(eventObject);});
			}
			return this;
		},
		onPosition: function(positionHandler) {
			this.position = positionHandler;
			return this;
		},
		removeEventHandlers: function() {
			this._jquery.off();
			return this;
		},

		// modifiers
		css : function(propertyName, value) {
			if (value === undefined) {
				return this._jquery.css(propertyName);
			}
			this._jquery.css(propertyName, value);
			return this;
		},
		hide : function() {
			this._jquery.hide();
		},
		show : function() {
			this._jquery.show();
		},

		// getters & setters
		
		// can't edit selector or jquery
		selector : function() {
			return this._selector;
		},
		jquery : function() {
			return this._jquery;
		},

		height: function(height) {
			if (height === undefined) {
				return this._jquery.height();
			}
			this._jquery.css("height", height);
			return this;
		}, 

		width: function(width) {
			if (width === undefined) {
				return this._jquery.width();
			}
			this._jquery.css("width", width);
			return this;
		}, 

		top: function(top) {
			if (top === undefined) {
				return parseInt(this._jquery.css("top"),10);
			}
			this._jquery.css("top", top);
			return this;
		}, 
		moveDown: function(distance) {
			this._jquery.css("top", "+="+distance);
			return this;
		}, 
		moveUp: function(distance) {
			this._jquery.css("top", "-="+distance);
			return this;
		},

		left: function(left) {
			if (left === undefined) {
				return parseInt(this._jquery.css("left"),10);
			}
			this._jquery.css("left", left);
			return this;
		}, 
		moveRight: function(distance) {
			this._jquery.css("left", "+="+distance);
			return this;
		},
		moveLeft: function(distance) {
			this._jquery.css("left", "-="+distance);
			return this;
		},

		fontSize: function(fontSize) {
			if (fontSize === undefined) {
				return parseInt(this._jquery.css("font-size"),10);
			}
			this._jquery.css("font-size", fontSize);
			return this;
		}
	};
	
	return {
		PageForm : new PageForm(),
		Element : Element
	};

}();