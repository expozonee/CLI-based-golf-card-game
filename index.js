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

function finishGame(deckIsEmpty) {
  if (deckIsEmpty) {
    rl.question("Play again? (Y/N) ", (answer) => {
      if (answer.toUpperCase() === "Y") {
        console.clear();
        askForNames();
      } else rl.close();
    });
  } else {
    const playerOneScore = players[0].cards.reduce((total, card) => {
      return total + card.value;
    }, 0);
    const playerTwoScore = players[1].cards.reduce((total, card) => {
      return total + card.value;
    }, 0);

    console.log("                  ");
    console.log("Game Over!");
    console.log("                  ");
    board();
    console.log("                  ");
    console.log("Final Scores:");
    console.log(`${players[0].name}: ${playerOneScore}`);
    console.log(`${players[1].name}: ${playerTwoScore}`);
    console.log("                  ");
    console.log(
      `${
        playerOneScore < playerTwoScore
          ? `${players[0].name} is the winner!`
          : playerTwoScore < playerOneScore
          ? `${players[1].name} is the winner!`
          : "Draw!"
      }`
    );
    console.log("                  ");
    rl.question("Play again? (Y/N) ", (answer) => {
      if (answer.toUpperCase() === "Y") {
        console.clear();
        askForNames();
      } else rl.close();
    });
  }
}

function logCardReplacing(playerNumber, cardNumber, drawnCard) {
  console.log("   ");
  console.log(
    `Replacing ${
      players[playerNumber].isShown[(cardNumber > 4 ? 4 : cardNumber) - 1]
        ? `[${
            players[playerNumber].cards[(cardNumber > 4 ? 4 : cardNumber) - 1]
              .rank
          } of ${
            players[playerNumber].cards[(cardNumber > 4 ? 4 : cardNumber) - 1]
              .suit
          }] with [${drawnCard.rank} of ${drawnCard.suit}]`
        : `[Face Down] card with [${drawnCard.rank} of ${drawnCard.suit}]`
    }`
  );
  console.log("   ");
}

function replaceCardQuestion(playerNumber, drawnCard, isRepeated = false) {
  if (isRepeated) {
    console.log("    ");
    console.log("You can only change face down card!");
    console.log("    ");
  }

  rl.question("Which card you want to replace (1-4): ", (cardNumber) => {
    discardPile.push(
      players[playerNumber].cards[(cardNumber > 4 ? 4 : cardNumber) - 1]
    );

    if (players[playerNumber].isShown[(cardNumber > 4 ? 4 : cardNumber) - 1]) {
      replaceCardQuestion(playerNumber, drawnCard, true);
    } else {
      logCardReplacing(playerNumber, cardNumber, drawnCard);

      players[playerNumber].cards[(cardNumber > 4 ? 4 : cardNumber) - 1] =
        drawnCard;
      players[playerNumber].isShown[
        (cardNumber > 4 ? 4 : cardNumber) - 1
      ] = true;

      taketurn(playerNumber === 0 ? 1 : 0);
    }
  });
}

function takeAction(playerNumber) {
  rl.question(
    "Take an action: 1) Draw from Deck 2) Take from dicard pile: ",
    (answer) => {
      if (answer !== "1" && answer !== "2") takeAction();
      if (answer === "1") {
        if (deck.length === 0) {
          console.log("   ");
          console.log("Deck card is empty! Game Over!");
          console.log("   ");
          deckIsEmpty = true;
          finishGame(deckIsEmpty);
        } else {
          const drawnCard = deck.pop();
          console.log(`Card drawn is ${drawnCard.rank} of ${drawnCard.suit}`);
          rl.question(
            "Take an action: 1) Replace it with face down card 2) Throw to discard pile: ",
            (answer) => {
              if (answer !== "1" && answer !== "2") {
                replaceCardQuestion(playerNumber, drawnCard);
              }
              if (answer === "1") {
                replaceCardQuestion(playerNumber, drawnCard);
              }
              if (answer === "2") {
                discardPile.push(drawnCard);
                taketurn(playerNumber === 0 ? 1 : 0);
              }
            }
          );
        }
      }
      if (answer === "2") {
        if (discardPile.length === 0) {
          console.log("         ");
          console.log("Pile card is empty! Instead take from the deck!");
          console.log("         ");
          taketurn(playerNumber);
        } else {
          const drawnCard = discardPile.pop();

          replaceCardQuestion(playerNumber, drawnCard);
        }
      }
    }
  );
}

function taketurn(playerNumber) {
  const isAllShown =
    players[0].isShown.every((isShown) => isShown === true) ||
    players[1].isShown.every((isShown) => isShown === true);

  board();
  console.log(`${players[playerNumber].name}'s turn!`);

  if (isAllShown) {
    for (const player of players) {
      for (let i = 0; i < player.isShown.length; i++) {
        player.isShown[i] = true;
      }
    }
    finishGame();
  } else {
    takeAction(playerNumber);
  }
}

function askForNames() {
  shuffleDeck(deck);
  discardPile = [];
  rl.question(`First player's name: `, (name) => {
    players[0].name = name;
    rl.question("Second player's name: ", (name) => {
      players[1].name = name;
      startGame();
    });
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

askForNames();
