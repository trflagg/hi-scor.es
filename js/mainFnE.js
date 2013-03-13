// cheap & easy namespaced globals
hiscores = {};
hiscores.arrowExpanded = false;

// init
$(function() {

	// Create new elements and add them to the page form
	// Order is important because onPosition is called in the order that the elements are added
	// this way I can refer to earlier elements' attributes in later onPosition's
	var pForm = FnE.PageForm;

	// logo
	pForm.addElement(
		new FnE.Element("#logo")
			.onPosition(function(windowWidth, windowHeight) {
				this.left(windowWidth * 0.05)
					.width( Math.min( Math.max(windowWidth * 0.35, 336), 448) )
					.top(Math.max((windowHeight * 0.375 - 200), 0));

				if (windowWidth < this.width()) {
					this.width(windowWidth);
					this.left(0);
				}
			})
	);

	// topLeftBar
	pForm.addElement(
		new FnE.Element("#topLeftBar")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				this.left(logo.left() + 2)
					.height(logo.top() - 5)
					.css("border-width", 4 * (logo.width() / 640));
				if (logo.top() <= 3) {
					this.hide();
				}
				else {
					this.show();
				}
			})
	);


	// each li in topLevelNavigation
	pForm.registerSelector("#topLevelNavigation li");
	// pForm.addElement( 
		// new FnE.Element("#topLevelNavigation li")
	// );

	// topLevelNavigation
	pForm.addElement(
		new FnE.Element("#topLevelNavigation")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				this.top(windowHeight - (windowHeight * 0.375))
					.left(logo.left() + (logo.width() - this.width()));
			})
	);

	// clickArrow
	pForm.addElement(
		new FnE.Element("#clickArrow")
			.onPosition(function(windowWidth, windowHeight) {
				if (!hiscores.arrowExpanded) {
					var logo = pForm.element("#logo");
					var navigation = pForm.element("#topLevelNavigation");
					this.top(navigation.top() - 15)
						.width(Math.max(60 * (logo.width() / 640), 34));

					this.left(logo.left() + 10);

				}
				
			})
			.onHover(
				//mouseenter
				function() {
					var logo = pForm.element("#logo");
					this.left(logo.left() + 20);
				},
				//mouseleave
				function() {
					var logo = pForm.element("#logo");
					this.left(logo.left() + 10);
				}
			)
			.onClick(function() {
				var logo = pForm.element("#logo");
				var navigation = pForm.element("#topLevelNavigation");
				var navigationLinks = pForm.element("#topLevelNavigation li");
				navigationLinks.animate(true).animationTimingFunction("ease-in");
				var $navigationLinks = navigationLinks.jquery();
				hiscores.arrowExpanded = true;
				var linkHeight = $navigationLinks.height();
				var paddingHeight = parseInt($navigationLinks.css("padding-bottom"),10);
				var arrowMoveDownBy = linkHeight + paddingHeight;


				this.animationDuration(1000)
					.removeEventHandlers()
					.runAnimation([
						function() {
							this.left(navigation.left() - this.width());
							$navigationLinks.slice(0,1).css('opacity',1.0);
							// you know something has gone wrong when you're using jquery's slice
							// in this case I'm hardcoding in that there are 4 links in the navigation
							// so I can reveal them one by one.
						},
						function() {
							$navigationLinks.slice(1,2).css('opacity',1.0);

							// firefox has a jitterie-ness to the arrow movements. 
							// I've tried everything I can think of to fix it.
							// I'm gonna blame it on this bug: 
							// https://support.mozilla.org/en-US/questions/949378
							this.animateProperty("top", "+="+arrowMoveDownBy);
						},
						function() {
							$navigationLinks.slice(2,3).css('opacity',1.0);
							this.animateProperty("top", "+="+arrowMoveDownBy);
						},
						function() {
							$navigationLinks.slice(3).css('opacity',1.0);
							this.animateProperty("top", "+="+arrowMoveDownBy);
						},
						function() {
							$(".outerFrame").css("overflow", "hidden");
							this.animateProperty("top", "+="+Math.min(500, $(window).height()) );
						},
						function() {
							this.hide();
							$(".outerFrame").css("overflow", "auto");

							navigationLinks.animate(false);
						}
					]);		
			})
	);


	// bottomLeftBar
	pForm.addElement(
		new FnE.Element("#bottomLeftBar")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				var topLeftBar = pForm.element("#topLeftBar");
				this.left(logo.left())
					.css("border-width", 4 * (logo.width() / 640))
					.top(logo.top() + logo.height() + 5)
					.height(windowHeight - this.top() - 5);
			})
	);

	// call resize to initialize the element's positions
	pForm.resize();
});

// set the pageForm resizer
$(window).resize(function() {
	FnE.PageForm.resize();
});


