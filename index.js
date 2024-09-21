const readline = require("readline");

const players = [
  {
    name: "",
    cards: [],
    isShown: [false, false, false, false],
  },
  {
    name: "",
    cards: [],
    isShown: [false, false, false, false],
  },
];

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

const cards = [
  { rank: "Ace", value: 1 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 0 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "Jack", value: -1 },
  { rank: "Queen", value: 12 },
  { rank: "King", value: 13 },
];

function createDeck() {
  let deck = [];
  suits.forEach((suit) => {
    cards.forEach((card) => {
      deck.push({ suit, rank: card.rank, value: card.value });
    });
  });
  return deck;
}

const deck = createDeck();

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

shuffleDeck(deck);
let discardPile = [];
let deckIsEmpty = false;
