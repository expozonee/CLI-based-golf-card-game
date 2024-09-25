# CLI Golf Card Game

A command-line implementation of a modified golf card game for two players. Test your memory and strategy in this fun and engaging card game!

## Introduction

Welcome to the CLI Golf Card Game! This is a command-line interface (CLI) version of a modified golf card game designed for two players. Each player has a hand of four cards, and the objective is to have the lowest score when the game ends. The game is built using JavaScript and can be run locally on your machine.

## Getting Started

To play the game, clone the repository to your local machine:

```bash
git clone https://github.com/expozonee/CLI-based-golf-card-game.git
```
Navigate to the project directory and run the following command:

```bash
npm i
```

and follow the instructions to run the game.


## Game Rules

1. **Players:** 2 players.
2. **Cards:** Each player has 4 cards in a single row. All cards start face down.
3. **Gameplay:**
   - Players take turns drawing cards and swapping them with their face-down cards to lower their total score.
   - The game ends when all cards in at least one player's hand are face up.
4. **Scoring:**
   - Number cards are worth their face value (Ace=1, 2=2, ..., 6=6, 8=8, 9=9, 10=10).
   - 7: Worth 0 points.
   - Jack: Worth -1 point.
   - Queen: Worth 12 points.
   - King: Worth 13 points.
   - A pair of any cards (except 7s and Jacks) is worth 0 points.

## Gameplay

1. **Game Start:**
   - The deck is shuffled.
   - Each player is dealt 4 face-down cards.
   - One card is placed face up to start the discard pile.
   - A random player is selected to start.

2. **Each Turn:**
   - The current game state is displayed:
     - Your hand (showing face-up and face-down cards).
     - The top card of the discard pile.
   - You are prompted to choose an action:
     - **Draw a card from the deck:**
       - After drawing, choose to:
         - **Replace a face-down card:** Swap the drawn card with one of your face-down cards. The replaced card goes face up on the discard pile.
         - **Discard the drawn card:** Place it face up on the discard pile without changing your hand.
     - **Take the top card from the discard pile:**
       - Replace one of your face-down cards with it. The replaced card goes face up on the discard pile.
   - **End of Turn:** After your action, the turn passes to the next player.

3. **Game End:**
   - The game continues until all cards in at least one player's hand are face up.
   - All remaining face-down cards are flipped face up.
   - Scores are calculated.
   - The player with the lowest total score wins.
   - You will be prompted to play again or exit.
