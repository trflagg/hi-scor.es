// cheap & easy namespaced globals
hiscores = {};
hiscores.arrowExpanded = false;

// init
$(function() {

});

function gamesClicked() {
	$("#topLevelUL").toggle();
	$("#gamesUL").toggle();
}

function aboutClicked() {
	$("#topLevelUL").toggle();
	$("#aboutUL").toggle();
	$("#spacerRow").load("about.html");
}

function aboutBackClicked() {
	$("#topLevelUL").toggle();
	$("#aboutUL").toggle();
	$("#spacerRow").empty();

}