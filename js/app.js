"use strict;"

//global variables
var windowWidth = 0;
var cardMargin = 12;
var columnCount = 0;
var center = 0;
var cards = [];

// change cars positions with window resize
$(function(){
	$(window).resize(initCards);
});

//initial calculations 
function initCards() {
    windowWidth = $(window).width(); //grab width of window
    columnWidth = $('.card').outerWidth(); //grab width of cards
    console.log(columnWidth);
    
    //make sure array is empty for when it resizes
    cards = [];
    
    //calculate max amount of columns that can be added 
    // two margins (for each side) plus the column width, divided by window width - no floats, round up.
    columnCount = Math.floor(windowWidth/(columnWidth + cardMargin * 2));

    //center cards 
    center = (windowWidth - ((columnWidth * columnCount) + (cardMargin * (columnCount-1)))) / 2;
    
    //loop through each column and push cardMargin to an array
    for(var i = 0; i < columnCount; i++) {
        cards.push(cardMargin);
    }

    //init next function
	placeCards();
}

//placment of cards based on calculations
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
            'left': (leftPosition + center) + 'px', 
            'top': smallestCard + 30 + 'px' 
        });

        //update the array with the new height; calculated by adding the current height to the height of the current card and the margin.
        cards[cardIndex] = smallestCard + $(this).outerHeight() + cardMargin;
	})

   

}


   


