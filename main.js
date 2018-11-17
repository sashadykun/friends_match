$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var restrictCardClick = false;
var countAttempts = 0;
var countAccuracy = 0;
var countMatches = 0;
var gamesPlayed = 0;
var countGames = 0;
var frontOfTheCard = [
    './images/chandlerbing1.jpg',
    './images/girls.jpg',
    './images/gunther1.jpg',
    './images/joeytribbiani1.jpg',
    './images/joye chand1.jpg',
    './images/monicagaller1.jpg',
    './images/phoebebuffet1.jpg',
    './images/rachelgreen1.jpg',
    './images/rossgaller1.jpg',
    './images/chandlerbing1.jpg',
    './images/girls.jpg',
    './images/gunther1.jpg',
    './images/joeytribbiani1.jpg',
    './images/joye chand1.jpg',
    './images/monicagaller1.jpg',
    './images/phoebebuffet1.jpg',
    './images/rachelgreen1.jpg',
    './images/rossgaller1.jpg'
];



//functions hve to be executed on load or reload.
function initializeApp(){
    createCardsOnTableGame();
    applyEventHandlersToDom();
    resetGame();
    
}

function makeRandomCardFromArray(){
    frontOfTheCard.sort(function(a, b){return 0.5 - Math.random()});
}

function createCardsOnTableGame () {

    makeRandomCardFromArray();
    for (var cardIndex=0; cardIndex <frontOfTheCard.length; cardIndex++ ) {
       var cardContainer = $('<div>').addClass('cardContainer');
       var card = $('<div>').addClass('card');
       var front = $('<div>').addClass('front');
       var frontImage = $('<img>', {
           class: 'imgSize',
           src: frontOfTheCard[cardIndex]
       });
       var back = $('<div>').addClass('back');
       front.append(frontImage);
       card.append(front);
       card.append(back);
       cardContainer.append(card);
       $('.gameTable').append(cardContainer);
    }
}

function resetGame(){
    $('.reset').click(handleResetGame);
    
}
function handleResetGame(){
    firstCardClicked = null;
    secondCardClicked = null;
    restrictCardClick = false;
    countAttempts = 0;
    countMatches = 0;
    countAccuracy = 0;
    frontOfTheCard = [
    './images/chandlerbing1.jpg',
    './images/girls.jpg',
    './images/gunther1.jpg',
    './images/joeytribbiani1.jpg',
    './images/joye chand1.jpg',
    './images/monicagaller1.jpg',
    './images/phoebebuffet1.jpg',
    './images/rachelgreen1.jpg',
    './images/rossgaller1.jpg',
    './images/chandlerbing1.jpg',
    './images/girls.jpg',
    './images/gunther1.jpg',
    './images/joeytribbiani1.jpg',
    './images/joye chand1.jpg',
    './images/monicagaller1.jpg',
    './images/phoebebuffet1.jpg',
    './images/rachelgreen1.jpg',
    './images/rossgaller1.jpg'
];
    
    $('.gameTable').empty();
    createCardsOnTableGame ();
    applyEventHandlersToDom();
    $('.atemptsNumber').text(countAttempts);
    countAccuracy = $('.accuracyNumber').text(countAccuracy)
}

function applyEventHandlersToDom() {
    $('.card').click(handleCardClick);
}


function handleCardClick() {
    if(restrictCardClick){
        return;
    }
    if ($(event.currentTarget).hasClass('hide')) {
        return;
    }

    if (firstCardClicked === null){
        firstCardClicked = event.currentTarget;
        hideCard(event.currentTarget);
    } else {
        hideCard(event.currentTarget);
        secondCardClicked = event.currentTarget;
        countAttempts++
        

        if($(firstCardClicked).find('.front img').attr('src') === $(secondCardClicked).find('.front img').attr('src')) {
            firstCardClicked = null;
            secondCardClicked = null;
            countMatches++;
            
            

        } else {
            restrictCardClick = true;
            setTimeout(delayResetNotMatchedCards, 1000);
        }
    }
    $('.atemptsNumber').text(countAttempts);
    if(countMatches>0){
        countAccuracy = $('.accuracyNumber').text(((countMatches / countAttempts)*100).toFixed(0) + '%');
    }
    if(countMatches==9){
        countGames++
        gamesPlayed = $('.gameNumber').text(countGames);
        $('.gameTable').empty();
        setTimeout(handleResetGame, 2000);
        
    }
    

}
function delayResetNotMatchedCards() {
    restrictCardClick = false;
    $(firstCardClicked).removeClass('hide');
    $(secondCardClicked).removeClass('hide');
    firstCardClicked = null;
    secondCardClicked = null;
}

function hideCard(card) {

    $(card).addClass('hide');
}
