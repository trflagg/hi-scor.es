// cheap & easy namespaced globals
hiscores = {};
hiscores.arrowExpanded = false;

// init
$(function() {

	// Create new elements and add them to the page form
	// Order is important because onPosition is called in the order that the elements are added
	// this way I can refer to earlier elements' attributes in later onPosition's
	var pForm = FnE.PageForm;

	pForm.registerSelector("#logo");

	pForm.addElement(
		new FnE.Element("#clickArrow")
			.onPosition( function(windowWidth, windowHeight) {
				this.top(windowHeight * 0.618);
				this.width(windowWidth * 0.03);
				this.left(windowWidth * 0.05 + (0.01 * windowWidth));
			})
	);

	// each li in topLevelNavigation
	// pForm.addElement( 
	// 	new FnE.Element("#topLevelNavigation li")
	// 		.onPosition(function(windowWidth, windowHeight) {
	// 			this.fontSize( Math.min( Math.max(windowWidth * 0.03225806451, 20), 35))
	// 			.css("line-height", (this.fontSize() * 1.618) + "px");
	// 		})
	// );

	// // topLevelNavigation
	// pForm.addElement(
	// 	new FnE.Element("#topLevelNavigation")
	// 		.onPosition(function(windowWidth, windowHeight) {
	// 			var logo = pForm.element("#logo");
	// 			this.top(windowHeight * 0.618)
	// 				.left(logo.width() + (windowWidth * 0.05) - this.width());
	// 		})
	// );


	// call resize to initialize the element's positions
	pForm.resize();
});


// set the pageForm resizer
$(window).resize(function() {
	FnE.PageForm.resize();
});
