
# Super Tic Tac Toe

**Super Tic Tac Toe** is a web-based version of the Tic Tac Toe game, but with a twist! In this variant, there are nine small Tic Tac Toe boards, and the rules of winning the game are extended to a "big" board consisting of these smaller boards. This game is built using **React** and deployed using **GitHub Pages**.
![Super TicTacToe](https://github.com/karraharichandana/super-tic-tac-toe/blob/main/src/screenshot.png)

## Table of Contents

- [Features](#features)
- [Game Rules](#game-rules)
- [Installation](#installation)
- [Running the Game](#running-the-game)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)


## Features

- 9x9 grid of smaller Tic Tac Toe boards
- Winning logic extended to the "big board"
- Player turns switch between X and O
- Confetti celebration for the winner
- Reset option to start a new game

## Game Rules

1. The game consists of nine smaller Tic Tac Toe boards arranged in a 3x3 grid.
2. Players take turns marking "X" or "O" on the small boards.
3. Winning a small board follows the classic Tic Tac Toe rules: three in a row (horizontally, vertically, or diagonally).
4. Once a player wins a small board, they "win" that square on the big board.
5. To win the game, a player must win three small boards in a row on the big board (horizontally, vertically, or diagonally).
6. The next player must make their move on the board corresponding to the position of the last move's square.
7. If that board is already won, the player can choose any free board.
8. If all squares are filled and there is no winner, the game is declared a draw.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/karraharichandana/super-tic-tac-toe.git
   cd super-tic-tac-toe
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Game

To start the game locally, run the following command:
```bash
npm start
```

This will launch the game in your default browser at `http://localhost:3000`.

## Deployment

This project is deployed using **GitHub Pages**. To deploy your own version, follow these steps:

1. Install the `gh-pages` package as a dev dependency:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy the project:
   ```bash
   npm run deploy
   ```

4. Access the deployed app at:
   ```text
   https://your-username.github.io/super-tic-tac-toe
   ```

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **React Confetti**: Library to add a confetti effect for the winner
- **gh-pages**: For deploying to GitHub Pages
- **CSS**: Styling the game and layout
