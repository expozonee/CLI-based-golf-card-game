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

function startGame() {
  players.forEach((player) => {
    for (let i = 0; i < 4; i++) {
      player.cards.push(deck.pop());
    }
  });
  discardPile.push(deck.pop());
  taketurn(0);
}

function board() {
  console.log("   ");
  console.log("------ Board ------");

  for (const player of players) {
    let msg = [];
    player.cards.forEach((card, index) => {
      if (player.isShown[index]) {
        msg.push(`[${card.rank} of ${card.suit}]`);
      } else {
        msg.push("[Face Down]");
      }
    });
    console.log(`Hand of ${player.name}: `, msg.join(", "));
  }
  console.log(
    `Discard Pile Top Card: ${
      discardPile.length > 0
        ? `${discardPile[discardPile.length - 1].rank} of ${
            discardPile.length > 0 && discardPile[discardPile.length - 1].suit
          }`
        : "Empty"
    } `
  );
  console.log("--------------------");
  console.log("   ");
}
