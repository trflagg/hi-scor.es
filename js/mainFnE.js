// cheap & easy namespaced globals
hiscores = {};
hiscores.arrowExpanded = false;
hiscores.middleDivFilled = false;

// init
$(function() {

	// Create new elements and add them to the page form
	// Order is important because onPosition is called in the order that the elements are added
	// this way I can refer to earlier elements' attributes in later onPosition's
	var pForm = FnE.PageForm;

	// logo
	var logo = new FnE.Element("#logo");
	logo.onPosition(function(windowWidth, windowHeight) {
		this.left(windowWidth * 0.05)
			.width( Math.min( Math.max(windowWidth * 0.35, 336), 448) )
			.top(Math.max((windowHeight * 0.375 - 200), 0));

		if (windowWidth < this.width()) {
			this.width(windowWidth);
			this.left(0);
		}
	});
	pForm.addElement(logo);

	// topLeftBar
	var topLeftBar = new FnE.Element("#topLeftBar");
	topLeftBar.onPosition(function(windowWidth, windowHeight) {
		this.left(logo.left() + 2)
			.height(logo.top() - 5)
			.css("border-width", 4 * (logo.width() / 640));
		if (logo.top() <= 3) {
			this.hide();
		}
		else {
			this.show();
		}
	});
	pForm.addElement(topLeftBar);


	// each li in topLevelNavigation
	var navigation = new FnE.Element("#topLevelNavigation li");
	pForm.addElement(navigation);

	// topLevelNavigation
	pForm.addElement(
		new FnE.Element("#topLevelNavigation")
			.onPosition(function(windowWidth, windowHeight) {
				this.top(windowHeight - (windowHeight * 0.375))
					.left(logo.left() + (logo.width() - this.width()));

				if (this.top() + this.height() > windowHeight) {
					this.top(windowHeight - this.height());
				}

				if (this.top() < logo.top() + logo.height()) {
					this.top(logo.top() + logo.height());
				}

				if (this.left() + this.width() > windowWidth) {
					this.left(windowWidth - this.width());
				}

			})
	);
	var topLevelNavigation = pForm.element("#topLevelNavigation");

	// clickArrow
	pForm.addElement(
		new FnE.Element("#clickArrow")
			.onPosition(function(windowWidth, windowHeight) {
				if (!hiscores.arrowExpanded) {
					var navigation = pForm.element("#topLevelNavigation");
					this.top(navigation.top() - 15)
						.width(Math.max(60 * (logo.width() / 640), 34));

					this.left(logo.left() + 10);

				}
				
			})
			.onHover(
				//mouseenter
				function() {
					this.left(logo.left() + 20);
				},
				//mouseleave
				function() {
					this.left(logo.left() + 10);
				}
			)
			.onClick(function() {
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

	// middleDiv
	pForm.addElement(
		new FnE.Element("#middleDiv")
			.onPosition(function(windowWidth, windowHeight) {
				this.top(logo.top() + logo.height());
				this.left( topLevelNavigation.left() + topLevelNavigation.width());
				
				if (hiscores.middleDivFilled && windowWidth < 700) {
					this.left(topLevelNavigation.left());
					topLevelNavigation.top( this.top() + this.height());
				}
			})
	);

	// bottomLeftBar
	pForm.addElement(
		new FnE.Element("#bottomLeftBar")
			.onPosition(function(windowWidth, windowHeight) {
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


function gamesClicked() {
	$("#middleDiv").addClass("loaded").load("games.html");
	hiscores.middleDivFilled = true;
}

function aboutClicked() {
	$("#middleDiv").load("about.html");
	hiscores.middleDivFilled = true;
}

function resumeClicked() {
	$("#middleDiv").load("resume.html");
	hiscores.middleDivFilled = true;
}

function blogClicked() {
	hiscores.middleDivFilled = true;
}
