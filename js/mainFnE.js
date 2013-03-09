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
					.width(Math.max(windowWidth * 0.275, 350))
					.top(Math.max((windowHeight * 0.375 - 200), 0));
			})
	);

	// topLeftBar
	pForm.addElement(
		new FnE.Element("#topLeftBar")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				this.left(logo.left() + 2)
					.height(logo.top() - 20)
					.css("border-width", windowWidth * (4 / (640 / 0.275)));
				if (logo.top() <= 3) {
					this.hide();
				}
				else {
					this.show();
				}
			})
	);

	// clickArrow
	pForm.addElement(
		new FnE.Element("#clickArrow")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				this.top(windowHeight - (windowHeight * 0.375))
					.width(Math.max(windowWidth * (60 / (640 / 0.275)), 40));

				if (hiscores.arrowExpanded) {
					this.left(logo.left() + logo.width() - this.width() - navigation.fontSize() * 5);
				}
				else {
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
				var $navigationLinks = navigation.jquery().find("li");

				hiscores.arrowExpanded = true;

				this.animationDuration(1000)
					.animationTimingFunction("easeInOutCubic")
					.removeEventHandlers()
					.runAnimation([
						function() {
							this.left(logo.left() + logo.width() - this.width() - navigation.fontSize() * 4);
							// you know something has gone wrong when you're using jquery's slice
							// I'm hardcoding in that there are 4 links in the navigation
							// and I want to reveal each one by one.
							// This is also harcoded into the moveDown factor.
						},
						function() {
							this.animationDuration(1000)
								.animationTimingFunction("easeOutCubic")
								.moveDown($navigationLinks.slice(0,1).height());
							$navigationLinks.slice(0,1).show();
						},
						function() {
							this.moveDown($navigationLinks.slice(1,2).height());
							$navigationLinks.slice(1,2).show();
						},
						function() {
							this.moveDown($navigationLinks.slice(2,3).height());
							$navigationLinks.slice(2,3).show();
						},
						function() {
							this.moveDown(navigation.height());
							$navigationLinks.slice(3).show();
						},
						function() {
							this.hide();
						}
					]);		
			})
	);

	// topLevelNavigation
	pForm.addElement(
		new FnE.Element("#topLevelNavigation")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				var clickArrow = pForm.element("#clickArrow");
				this.top(clickArrow.top() - 10)
					.fontSize(Math.max(windowWidth * (45 / (640 / 0.275)), 20))
					.left(logo.left() + logo.width() - this.fontSize() * 5)
					.height(windowHeight - clickArrow.top() - 15);
			})
	);

	// bottomLeftBar
	pForm.addElement(
		new FnE.Element("#bottomLeftBar")
			.onPosition(function(windowWidth, windowHeight) {
				var logo = pForm.element("#logo");
				var topLeftBar = pForm.element("#topLeftBar");
				this.left(logo.left())
					.css("border-width", topLeftBar.css("border-width"))
					.top(logo.top() + logo.height() + 5)
					.height(windowHeight - this.top() - 2);
			})
	);

	// call resize to initialize the element's positions
	pForm.resize();
});

// set the pageForm resizer
$(window).resize(function() {
	FnE.PageForm.resize();
});


