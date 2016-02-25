

//global variables
var windowWidth = 0;
var cardMargin = 20;
var columnCount = 0;
var columnWidth = 0;
var cards = [];

$(function(){
	$(window).resize(initCards);
});

function initCards() {
    windowWidth = $(window).width(); //grab width of window
    columnWidth = $('.card').outerWidth(); //grab width of cards
    cards = [];
    //calculate max amount of columns that can be added 
    columnCount = Math.floor(windowWidth/(columnWidth + cardMargin * 2));
    
    //loop through each column and push cardMargin to an array
    for(var i = 0; i < columnCount; i++) {
        cards.push(cardMargin);
    }
	placeCards();
}

function placeCards() {
	$('.card').each(function() {

		//find the card with the lowest value (which is also card with lowest height) 
		var smallestCard = Math.min.apply(Math, cards);

		//find the index of that card
		var cardIndex = cards.indexOf(smallestCard);

		//to calculate left position: add columnWidth and cardMargin, multiply by cardIndex, and add cardMargin again
		var leftPosition = cardMargin + (cardIndex * (columnWidth + cardMargin));

		//assign left and top css values 
        $(this).css({
            'left': leftPosition + 'px',
            'top': smallestCard + 'px'
        });

        //update the array with the new height; calculated by adding the current height to the height of the current card and the margin.
        cards[cardIndex] = smallestCard + $(this).outerHeight() + cardMargin;
	})
}

