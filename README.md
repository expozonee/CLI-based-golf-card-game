# CLI Golf Card Game
A command-line implementation of a modified golf card game for two players. Test your memory and strategy in this fun and engaging card game!

# Introduction
Welcome to the CLI Golf Card Game! This is a command-line interface (CLI) version of a modified golf card game designed for two players. Each player has a hand of four cards, and the objective is to have the lowest score when the game ends. The game is built using JavaScript and can be run locally on your machine.

# Game Rules
1. Players: 2 players.
2. Cards: Each player has 4 cards in a single row. All cards start face down.
3. Gameplay:
    1. Players take turns drawing cards and swapping them with their face-down cards to try and lower their total score.
    2. The game ends when all cards in at least one player's hand are face up.
4. Scoring:
    1. Number cards have their face value (Ace=1, 2=2, ..., 6=6, 8=8, 9=9, 10=10).
    2. 7: Worth 0 points.
    3. Jack: Worth -1 point.
    4. Queen: Worth 12 points.
    5. King: Worth 13 points.
    6. A pair of any cards (except 7s and Jacks) is worth 0 points.

# Gameplay:

1. Game Start:
    1. The deck is shuffled.
    2. Each player is dealt 4 face-down cards.
    3. One card is placed face up to start the discard pile.
    4. A random player is selected to start.
2. Each Turn:
    1. The current game state is displayed:
      1. Your hand (showing face-up and face-down cards).
      2. The top card of the discard pile.
    2. You are prompted to choose an action:
       1. Draw a card from the deck:
          1. After drawing, choose to:
              1. Replace a face-down card: Swap the drawn card with one of your face-down cards. The replaced card is placed face up on the discard pile.
              2. Discard the drawn card: Place it face up on the discard pile without changing your hand.
        2. Take the top card from the discard pile:
              1. Replace one of your face-down cards with it. The replaced card is placed face up on the discard pile.
    3. End of Turn: After your action, the turn passes to the next player.
3. Game End:
  1. The game continues until all cards in at least one player's hand are face up.
  2. All remaining face-down cards are flipped face up.
  3. Scores are calculated.
  4. The player with the lowest total score wins.
  5. You will be prompted to play again or exit.
