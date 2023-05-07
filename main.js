const suits = ["♤", "♡", "♢", "♧"];
const faces = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let playerCard = document.querySelector(".player-card");
let playerRemain = document.querySelector(".player");
let text = document.querySelector(".text");
let deck;

//classes
class Deck {
  constructor(cards = deckCard52()) {
    this.cards = cards;
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const tempCard = this.cards[randomIndex];
      this.cards[randomIndex] = this.cards[i];
      this.cards[i] = tempCard;
    }
  }
  deal_card() {
    return this.cards.shift();
  }
}
class Card {
  constructor(suit, face) {
    this.suit = suit;
    this.face = face;
  }
  createCard() {
    const cardDom = document.createElement("div");
    cardDom.innerText = this.suit;
    cardDom.dataset.face = this.face + " " + this.suit;
    if (this.suit === "♡" || this.suit === "♢") {
      cardDom.classList.add("card", "red");
    } else {
      cardDom.classList.add("card");
    }
    return cardDom;
  }
}
//functions

function deckCard52() {
  let cardsArr = suits.map((suit) => faces.map((face) => new Card(suit, face)));
  return cardsArr.flat();
}

function start() {
  text.innerText = "";
  clearPlayerCard();
  deck = new Deck();
  deck.shuffle();
  playerRemain.innerText = deck.cards.length;
}

function playGame() {
  clearPlayerCard();
  const showCard = new Deck(deck.deal_card());
  let createdCard = showCard.cards.createCard();
  playerCard.appendChild(createdCard);
  playerRemain.innerText = deck.cards.length;
}

function clearPlayerCard() {
  playerCard.innerHTML = "";
}

//events

playerRemain.addEventListener("click", () => {
  if (deck.cards.length != 0) {
    playGame();
  } else {
    text.innerText = "game over";
  }
});

document.querySelector(".btn").addEventListener("click", () => {
  start();
});

start();
