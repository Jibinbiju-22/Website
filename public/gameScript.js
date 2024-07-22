const cards = document.querySelectorAll(".card");
refreshBtn = document.getElementById("refreshButton");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let movesCount = 0;
let startTime;
let timerInterval;

function flipCard({target: clickedCard}) {
    movesCount++;
    updateMovesDisplay();
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert(`"CONGRATULATIONS, YOU WON THE GAME WITHIN ${movesCount} FLIPS AND COMPLETED IT IN ${ document.getElementById("time").textContent}ONDS."`)
                return shuffleCard();
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    startTime = new Date();
    timerInterval = setInterval(updateTimerDisplay, 1000);
    movesCount = 0;
    document.getElementById("moves-counter").textContent = movesCount;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/game/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}
function updateMovesDisplay() {
    document.getElementById("moves-counter").textContent = movesCount;
}
function updateTimerDisplay() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    
    document.getElementById("time").textContent = elapsedTime + " SEC";
}

refreshBtn.addEventListener("click", shuffleCard);

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});